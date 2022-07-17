import Shop from "../interfaces/shop/Shop";
import NewShop from "../interfaces/shop/NewShop";

const webApiUrl = "https://localhost:44333/api/shops/";

class ShopService {
	
	get = async (urlParams: string): Promise<Shop[]> => {
		const options = {
			method: "GET",
		};
		const request = new Request(webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		return response.json();
	};
	
	post = async (model: NewShop): Promise<Shop> => {
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
	
	put = async (model: Shop): Promise<Shop> => {
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
	
	delete = async (id: string): Promise<Shop> => {
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

export default ShopService;