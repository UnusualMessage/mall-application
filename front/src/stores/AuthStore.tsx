import { action, makeObservable, observable, runInAction } from "mobx";

import AuthService from "../api/services/AuthService";
import AuthenticateUser from "../api/interfaces/user/AuthenticateUser";
import isError from "../utils/isError";
import { Requester } from "./base";
import { requesterProps } from "./base/Requester";

const props = {
    ...requesterProps,

    isLogin: observable,
    accessToken: observable,
    authenticateUser: action,
    refreshUser: action,
    login: action,
    logout: action,
};

class AuthStore extends Requester {
    private isLogin: boolean;
    private authService: AuthService;
    private accessToken: string;

    constructor() {
        super();

        this.isLogin = false;
        this.accessToken = "";
        this.authService = new AuthService();

        makeObservable(this, {
            ...props,
        });
    }

    public entered = () => {
        return this.isLogin;
    };

    public getAccessToken = () => {
        return this.accessToken;
    };

    public access = async () => {
        const data = await this.authService.access();

        if (isError(data)) {
            this.invokeError(data.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.login(data.token);
        });
    };

    public authenticateUser = async (user: AuthenticateUser) => {
        const data = await this.authService.authenticate(user);

        if (isError(data)) {
            this.invokeError(data.message);
            this.logout();
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.login(data.token);
        });
    };

    public refreshUser = async () => {
        const data = await this.authService.refresh();

        if (isError(data)) {
            this.invokeError(data.message);
            this.logout();
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.login(data.token);
        });
    };

    private login = (accessToken: string) => {
        this.accessToken = accessToken;
        this.isLogin = true;
    };

    private logout = () => {
        this.accessToken = "";
        this.isLogin = false;
    };
}

export default new AuthStore();
