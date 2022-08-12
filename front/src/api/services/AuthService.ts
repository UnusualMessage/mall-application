import AuthenticateUser from "../interfaces/user/AuthenticateUser";
import AuthenticateUserResponse from "../interfaces/user/AuthenticateUserResponse";

class AuthService {
	protected readonly webApiUrl: string;
	
	constructor(webApiUrl: string) {
		this.webApiUrl = webApiUrl;
	}
	
	public authenticate = async (model: AuthenticateUser): Promise<AuthenticateUserResponse> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		try {
			const request = new Request(this.webApiUrl + "authenticate", options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
	
	public refresh = async (): Promise<AuthenticateUserResponse> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify({})
		};
		
		try {
			const request = new Request(this.webApiUrl + "refresh", options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
}

export default AuthService;