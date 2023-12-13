import {FavoriteController} from "../controller/favorite.controller";
import {Router} from "express";
import {authentificate} from "../utils/guard.js";
import {HttpCodes, HttpConstants} from "../utils/constants/httpConstants";
import {errorHandler} from "../utils/errorHandler";

export class FavoriteRouter {
    router = Router();
    constructor(private favoriteController: FavoriteController) {
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.post('/add', async (req, res) => {
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

                await this.favoriteController.addFavorite(req.body.username, req.body.symbol);

                return res.status(HttpCodes.CREATED).json({message: 'favorite added'});
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
        this.router.post('/remove', async(req, res) => {
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

                await this.favoriteController.removeFavorite(req.body.username, req.body.symbol);

                return res.status(HttpCodes.OK).json({message: 'favorite removed'});
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
        this.router.post('/get', async (req, res) => {
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

                const companiesDTO = await this.favoriteController.getFavorites(req.body.username);
                console.log("companiesDTO :"+companiesDTO);
                return res.status(HttpCodes.OK).json({favorites: companiesDTO});
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