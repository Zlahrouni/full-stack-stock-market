import {UserController} from "../controller/user.controller";
import {Router} from "express";

export class UserRouter {
    router = Router();

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
    }
}