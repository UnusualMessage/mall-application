import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../api/services/AuthService";
import AuthenticateUser from "../api/interfaces/user/AuthenticateUser";

class AuthStore {
	private isLogin;
	private authService: AuthService;
	private accessToken: string;
	
	constructor() {
		this.isLogin = false;
		this.accessToken = "";
		this.authService = new AuthService();
		
		makeAutoObservable(this);
	}
	
	public entered = () => {
		return this.isLogin;
	};
	
	public authenticateUser = async (user: AuthenticateUser) => {
		const data = await this.authService.authenticate(user);
		
		runInAction(() => {
			if (data.successful) {
				this.accessToken = data.accessToken;
				this.isLogin = true;
			} else {
				this.accessToken = "";
				this.isLogin = false;
			}
		});
	};
	
	public refreshUser = async () => {
		const data = await this.authService.refresh();
		
		runInAction(() => {
			if (data.successful) {
				this.accessToken = data.accessToken;
				this.isLogin = true;
			} else {
				this.accessToken = "";
				this.isLogin = false;
			}
		});
	};
}

export default new AuthStore();