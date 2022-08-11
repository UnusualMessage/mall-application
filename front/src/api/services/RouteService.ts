import Route from "../interfaces/route/Route";

class RouteService {
	protected readonly webApiUrl: string;
	
	constructor(webApiUrl: string) {
		this.webApiUrl = webApiUrl;
	}
	
	public get = async (urlParams: string): Promise<Route[]> => {
		const options = {
			method: "GET",
		};
		
		try {
			const request = new Request(this.webApiUrl + "?" + urlParams, options);
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

export default RouteService;