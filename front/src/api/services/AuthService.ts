import AuthenticateUser from "../interfaces/user/AuthenticateUser";
import User from "../interfaces/user/User";

class AuthService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/users/";
	}
	
	public authenticate = async (model: AuthenticateUser): Promise<User> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl + "authenticate", options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public refresh = async (): Promise<User> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify({})
		};
		
		const request = new Request(this.webApiUrl + "refresh", options);
		const response = await fetch(request);
		
		return response.json();
	};
}

export default AuthService;