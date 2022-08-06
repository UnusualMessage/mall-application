import Shop from "../interfaces/shop/Shop";
import CreateShop from "../interfaces/shop/CreateShop";
import UpdateShop from "../interfaces/shop/UpdateShop";
import DeleteShop from "../interfaces/shop/DeleteShop";

const webApiUrl = "https://localhost:44333/api/shops/";

class ShopService {
	
	get = async (urlParams: string): Promise<Shop[]> => {
		const options = {
			method: "GET",
		};
		
		try {
			const request = new Request(webApiUrl + "?" + urlParams, options);
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
	
	post = async (model: CreateShop): Promise<Shop> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		try {
			const request = new Request(webApiUrl, options);
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
	
	put = async (model: UpdateShop): Promise<Shop> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		try {
			const request = new Request(webApiUrl, options);
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
	
	delete = async (model: DeleteShop): Promise<Shop> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "DELETE",
			headers
		};
		
		try {
			const request = new Request(webApiUrl + "/" + model.id, options);
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

export default ShopService;