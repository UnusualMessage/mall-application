import Breadcrumb from "../interfaces/breadcrumb/Breadcrumb";

class BreadcrumbService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/breadcrumbs/";
	}
	
	public get = async (urlParams: string): Promise<Breadcrumb[]> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return response.json();
	};
}

export default BreadcrumbService;