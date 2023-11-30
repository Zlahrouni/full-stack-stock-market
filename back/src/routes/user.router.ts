import {UserController} from "../controller/user.controller";
import {Router} from "express";
import * as jwt from 'jsonwebtoken';
import {TokenServiceImpl} from "../service/token.service.impl";
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
                // Check if username and password are valid
                if (req.body.username == null || req.body.password == null) {
                    res.status(400).send('Bad Request');
                    return;
                }
                // Check if username already exists
                const user = await this.userController.getUserByUsername(req.body.username);
                if(user != null)  {
                    res.status(400).send('Username already exists');
                    return;
                }
                // Add user to database
                const newUser = await this.userController.addUser(req.body);

                res.status(200).send(newUser);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });

        // login router
        this.router.post('/login', async (req, res) => {
            try {
                console.log("Serving request for /login")
                // Check if username and password are valid
                if (req.body.username == null || req.body.password == null) {
                    res.status(400).json({ error: 'Bad Request' });
                    return;
                }
                // Check if username already exists
                const user = await this.userController.getUserByUsername(req.body.username);
                if(user == null)  {
                    res.status(400).json({ error: 'Username does not exist' });
                    return;
                }
                // Check if password is valid
                const valid = await this.userController.checkPassword(req.body.password, user.password);
                console.log("password valid: " + valid);
                if(!valid) {
                    res.status(400).json({ error: 'Invalid password' });

                    return;
                }
                // Create JWT

                const secretKey = 'your-secret-key';
                const token = jwt.sign({ username: user.username }, secretKey);
                this.tokenService.setToken(token, user.username);
                console.log("token: " + token);
                res.status(200).json({ token });

            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // check Token
        this.router.post('/checkSession', async (req, res) => {
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
        })
    }
}