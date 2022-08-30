import AuthenticateUser from "../interfaces/user/AuthenticateUser";
import { Error } from "../interfaces/fetch";
import { get, post } from "./requests";
import AccessToken from "../interfaces/user/AccessToken";

class AuthService {
    protected readonly url: string;

    constructor() {
        this.url = "/api/users";
    }

    public access = async (): Promise<AccessToken | Error> => {
        return await get(this.url, "access", "");
    };

    public authenticate = async (
        model: AuthenticateUser
    ): Promise<AccessToken | Error> => {
        return await post(model, this.url, "authenticate", "");
    };

    public refresh = async (): Promise<AccessToken | Error> => {
        return await post({}, this.url, "refresh", "");
    };
}

export default AuthService;
