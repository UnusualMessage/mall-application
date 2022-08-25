import Route from "../interfaces/route/Route";
import resolveResponse from "../../utils/resolveResponse";
import {Error} from "../interfaces/Error";

class RouteService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "/api/routes/";
	}
	
	public get = async (urlParams: string): Promise<Route[] | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default RouteService;