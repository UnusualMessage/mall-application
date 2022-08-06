import Discount from "../interfaces/discount/Discount";
import CreateDiscount from "../interfaces/discount/CreateDiscount";
import UpdateDiscount from "../interfaces/discount/UpdateDiscount";
import DeleteDiscount from "../interfaces/discount/DeleteDiscount";

const webApiUrl = "https://localhost:44333/api/discounts/";

class DiscountService {
	
	get = async (urlParams: string): Promise<Discount[]> => {
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
	
	post = async (model: CreateDiscount): Promise<Discount> => {
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
	
	put = async (model: UpdateDiscount): Promise<Discount> => {
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
	
	delete = async (model: DeleteDiscount): Promise<Discount> => {
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

export default DiscountService;