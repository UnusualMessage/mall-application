import Shop from "../interfaces/shop/Shop";
import CreateShop from "../interfaces/shop/CreateShop";
import UpdateShop from "../interfaces/shop/UpdateShop";
import DeleteShop from "../interfaces/shop/DeleteShop";
import Service from "./Service";

class ShopService extends Service<Shop, CreateShop, UpdateShop, DeleteShop>{
	constructor() {
		super("https://localhost:44328/api/shops/");
	}
	
	public post = async (model: CreateShop): Promise<Shop> => {
		const formData = new FormData();
		
		for (const key in model) {
			if (model[key]) {
				if (key === "image") {
					formData.append(key, model[key] as Blob);
				} else {
					formData.append(key, model[key] as string);
				}
			}
		}
		
		const options = {
			method: "POST",
			body: formData
		};
		
		try {
			const request = new Request(this.webApiUrl, options);
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