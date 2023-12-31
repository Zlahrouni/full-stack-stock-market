import {UserController} from "../controller/user.controller";
import {Router} from "express";
import {TokenServiceImpl} from "../service/token.service.impl";
import {authentificate} from "../utils/guard.js";
import {HttpCodes, HttpConstants} from "../utils/constants/httpConstants";
import {errorHandler} from "../utils/errorHandler";

export class UserRouter {
    router = Router();
    tokenService = new TokenServiceImpl();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        // sign up router
        this.router.post('/signup', async (req, res) => {
            try {
                console.log("Serving request for /signup")
                // Add user to database
                await this.userController.addUser(req.body.username, req.body.password);

                res.status(HttpCodes.CREATED).json({ message: 'User created successfully' });
            } catch (error) {
                if(error instanceof Error) {
                    if (Object.values(HttpConstants).includes(error.message as HttpConstants)) {
                        res.status(errorHandler(error.message as HttpConstants)).json({error: error.message});
                        return;
                    }
                    res.status(500).send('internal server error');
                }
            }
        });

        // login router
        this.router.post('/login', async (req, res) => {
            try {
                console.log("Serving request for /login")
                const token = await this.userController.login(req.body.username, req.body.password);

                res.status(200).json({ token });

            } catch (error) {
                if(error instanceof Error) {
                    if (Object.values(HttpConstants).includes(error.message as HttpConstants)) {
                        res.status(errorHandler(error.message as HttpConstants)).json({error: error.message});
                        return;
                    }

                    res.status(500).send('internal server error');
                }
            }
        });

        // check Token
        this.router.post('/checkToken', async (req, res) => {
            try {
                console.log("Serving request for /checkSession")
                // Check if token is valid
                if (req.body.token == null) {
                    res.status(400).json({ error: 'Bad Request' });
                    return;
                }
                // Check if token is valid
                const valid = await this.tokenService.checkToken(req.body.token);
                console.log("token valid: " + valid);
                if(!valid) {
                    res.status(400).json({ error: 'Invalid token' });
                    return;
                }
                // Get username from token
                const username = await this.tokenService.getUserName(req.body.token);
                console.log("username: " + username);
                res.status(200).json({ username });

            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.router.get('/logout', async (req, res) => {
            try {

                console.log("Serving request for /logout")
                const authorizationHeader = req.headers.authorization;

                // Check if the Authorization header exists
                if (!authorizationHeader) {
                    res.status(401).json({ error: 'Not Authorized' });
                    return;
                }

                // Split the Authorization header to get the token without "Bearer "
                const [, token] = authorizationHeader.split(' ');

                await authentificate(token);

                // Delete token
                this.tokenService.removeToken(token);
                console.log("token deleted");
                res.status(200).json({ message: 'Logout successful' });
                return;
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.router.post('/delete', async (req, res) => {
            try {

                const authorizationHeader = req.headers.authorization;

                // Check if the Authorization header exists
                if (!authorizationHeader) {
                    res.status(401).json({ error: 'Not Authorized' });
                    return;
                }

                // Split the Authorization header to get the token without "Bearer "
                const [, token] = authorizationHeader.split(' ');

                await authentificate(token);

                await this.userController.deleteUser(req.body.username);

                res.status(200).json({ message: 'Delete Successful' });
                return;
            } catch (error) {
                if(error instanceof Error) {
                    if (Object.values(HttpConstants).includes(error.message as HttpConstants)) {
                        res.status(errorHandler(error.message as HttpConstants)).json({error: error.message});
                        return;
                    }

                    res.status(500).json({error: 'internal server error'});
                }
            }
        });


    }
}