import Breadcrumb from "../interfaces/breadcrumb/Breadcrumb";

class BreadcrumbService {
	protected readonly webApiUrl: string;
	
	constructor(webApiUrl: string) {
		this.webApiUrl = webApiUrl;
	}
	
	public get = async (urlParams: string): Promise<Breadcrumb[]> => {
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

export default BreadcrumbService;