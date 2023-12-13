import {Token} from "../model/token.model";
import {HttpConstants} from "./constants/httpConstants";

export async function authentificate(token: string, required=true) {
    if(token == null && required) {
        console.log("10122023 - token is null before find");
        throw new Error(HttpConstants.UNAUTHORIZED);
    }

    const tokenFound = await Token.findOne({
        where: {
            token: token
        }
    });

    if (tokenFound == null) {
        console.log("10122023 - token is null");
        if(required) {
            console.log("10122023 - token is null and required");
            throw new Error(HttpConstants.UNAUTHORIZED);
        } else {
            console.log("10122023 - token is null and not required return true");
            return Promise.resolve(true);
        }
    } else {
        return Promise.resolve(true);
    }
}