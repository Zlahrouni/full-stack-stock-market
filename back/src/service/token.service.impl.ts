import {TokenService} from "./token.service";
import {Token} from "../model/token.model";

export class TokenServiceImpl implements TokenService {
    async checkToken(token: String): Promise<boolean> {
        return await Token.findOne(
            {
                where: {
                    token: token
                }
            }
        ).then(token => {
            return token != null;
            //return token.expiration.getTime() > Date.now();
        })

    }

    async getUserName(token: String): Promise<string | null> {
        return Token.findOne(
            {
                where: {
                    token: token
                }
            }
        ).then(token => {
            return token?.username ?? null;
        }
        );
    }

    removeToken(token: String): void {
        Token.destroy(
            {
                where: {
                    token: token
                }
            }
        );
    }

    async setToken(token: string, value: String) {
        await Token.create(
            {
                token: token,
                username: value,
                expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            }
        ).then(() => console.log("Token created"));
    }
}