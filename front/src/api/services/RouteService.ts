import Route from "../interfaces/route/Route";

class RouteService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/routes/";
	}
	
	public get = async (urlParams: string): Promise<Route[]> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return response.json();
	};
}

export default RouteService;