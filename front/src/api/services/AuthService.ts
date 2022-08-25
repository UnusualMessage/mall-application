import AuthenticateUser from "../interfaces/user/AuthenticateUser";
import {Error} from "../interfaces/Error";
import resolveResponse from "../../utils/resolveResponse";

class AuthService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "/api/users/";
	}
	
	public authenticate = async (model: AuthenticateUser): Promise<unknown | Error> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl + "authenticate", options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public refresh = async (): Promise<unknown | Error> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify({})
		};
		
		const request = new Request(this.webApiUrl + "refresh", options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default AuthService;