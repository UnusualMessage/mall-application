import Discount from "../interfaces/discount/Discount";
import NewDiscount from "../interfaces/discount/NewDiscount";

const webApiUrl = "https://localhost:44333/api/discounts/";

class DiscountService {
	
	get = async (urlParams: string): Promise<Discount[]> => {
		const options = {
			method: "GET",
		};
		const request = new Request(webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		return response.json();
	};
	
	post = async (model: NewDiscount): Promise<Discount> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(webApiUrl, options);
		const response = await fetch(request);
		return response.json();
	};
	
	put = async (model: Discount): Promise<Discount> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(webApiUrl, options);
		const response = await fetch(request);
		return response.json();
	};
	
	delete = async (id: string): Promise<Discount> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "DELETE",
			headers
		};
		const request = new Request(webApiUrl + "/" + id, options);
		const response = await fetch(request);
		return response.json();
	};
}

export default DiscountService;