import {HttpCodes, HttpConstants} from "./constants/httpConstants";

export function errorHandler(error: HttpConstants) {
    switch (error) {
        case HttpConstants.USERNAMENOTFOUND:
            return HttpCodes.NOTFOUND;
        case HttpConstants.INVALIDPASSWORD:
            return HttpCodes.UNAUTHORIZED;
        case HttpConstants.PARAMREQUIRED:
            return HttpCodes.BADREQUEST;
        case HttpConstants.COMPANYNOTFOUND:
            return HttpCodes.NOTFOUND;
        case HttpConstants.ALREADYEXIST:
            return HttpCodes.CONFLICT;
        case HttpConstants.FAVORITENOTFOUND:
            return HttpCodes.NOTFOUND;
        default:
            return HttpCodes.INTERNALSERVERERROR;
    }
}