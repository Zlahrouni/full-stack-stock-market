export interface FavoriteService {
    addFavorite(username: string, symbol: string): Promise<void>;
    removeFavorite(username: string, symbol: string): Promise<void>;
    getFavorites(username: string): Promise<string[]>;
    isFavorite(username: string, symbol: string): Promise<boolean>;
}