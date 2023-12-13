
export interface TokenService {
    checkToken(token: String): Promise<boolean>;
    setToken(token: string, value: String): Promise<void> ;
    removeToken(token: String): void;
    getUserName(token: String): Promise<string | null>;
}