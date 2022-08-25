import AuthenticateUser from "../interfaces/user/AuthenticateUser";
import {Error} from "../interfaces/fetch";
import User from "../interfaces/user/User";
import {post} from "./requests";

class AuthService {
	protected readonly url: string;
	
	constructor() {
		this.url = "/api/users";
	}
	
	public authenticate = async (model: AuthenticateUser): Promise<User | Error> => {
		return post(model, this.url, "authenticate", "");
	};
	
	public refresh = async (): Promise<User | Error> => {
		return post({}, this.url, "refresh", "");
	};
}

export default AuthService;