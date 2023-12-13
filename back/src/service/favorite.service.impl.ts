import {FavoriteService} from "./favorite.service";
import {Favorite} from "../model/favorite.model";

export class FavoriteServiceImpl implements FavoriteService {

        async addFavorite(username: string, symbol: string): Promise<void> {
            await Favorite.create({
                username: username,
                symbol: symbol
            });
        }

        async removeFavorite(username: string, symbol: string): Promise<void> {
            await Favorite.destroy({
                where: {
                    username: username,
                    symbol: symbol
                }
            });
        }

        async getFavorites(username: string): Promise<string[]> {
            const favorites: Favorite[] = await Favorite.findAll({
                where: {
                    username: username
                }
            });
            const symbols: string[] = [];
            for (const favorite of favorites) {
                symbols.push(favorite.symbol);
            }
            return symbols;
        }

        async isFavorite(username: string, symbol: string): Promise<boolean> {
            const favorite: Favorite | null = await Favorite.findOne({
                where: {
                    username: username,
                    symbol: symbol
                }
            });
            return favorite !== null;

        }
}