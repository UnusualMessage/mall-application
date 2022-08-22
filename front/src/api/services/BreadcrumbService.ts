import Breadcrumb from "../interfaces/breadcrumb/Breadcrumb";
import resolveResponse from "../../utils/resolveResponse";
import {Error} from "../interfaces/Error";

class BreadcrumbService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/breadcrumbs/";
	}
	
	public get = async (urlParams: string): Promise<Breadcrumb[] | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default BreadcrumbService;