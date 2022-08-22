import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../api/services/AuthService";
import AuthenticateUser from "../api/interfaces/user/AuthenticateUser";
import RequestInfo from "../api/interfaces/RequestInfo";
import isError from "../utils/isError";
import User from "../api/interfaces/user/User";

class AuthStore {
	private isLogin: boolean;
	private authService: AuthService;
	private accessToken: string;
	private lastRequest: RequestInfo;
	
	constructor() {
		this.isLogin = false;
		this.accessToken = "";
		this.authService = new AuthService();
		
		this.lastRequest = {
			message: "",
			successful: true
		};
		
		makeAutoObservable(this);
	}
	
	public entered = () => {
		return this.isLogin;
	};
	
	private invokeSuccess = () => {
		this.lastRequest = {
			message: "",
			successful: true
		};
	};
	
	private invokeError = (error: string) => {
		this.lastRequest = {
			message: error,
			successful: false
		};
	};
	
	public isRequestSuccessful = () => {
		return this.lastRequest.successful;
	};
	
	public getErrorMessage = () => {
		return this.lastRequest.message;
	};
	
	public authenticateUser = async (user: AuthenticateUser) => {
		const data = await this.authService.authenticate(user) as User;
		
		if (isError(data)) {
			this.invokeError(data.message);
			this.logout();
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.login(data.accessToken);
		});
	};
	
	public refreshUser = async () => {
		const data = await this.authService.refresh() as User;
		
		if (isError(data)) {
			this.invokeError(data.message);
			this.logout();
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.login(data.accessToken);
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