import {makeAutoObservable, runInAction, toJS} from "mobx";

import Filterable from "../types/Filterable";
import Store from "../types/Store";
import shops from "../data/shops";
import UpdateShop from "../api/interfaces/shop/UpdateShop";
import DeleteShop from "../api/interfaces/shop/DeleteShop";
import CreateShop from "../api/interfaces/shop/CreateShop";
import Shop from "../api/interfaces/shop/Shop";
import ShopService from "../api/services/ShopService";

class ShopStore implements Filterable, Store {
	shops: Shop[] = [];
	
	shopService: ShopService;
	
	error: string;
	successful: boolean;
	
	filter: string;
	
	constructor() {
		this.shops = shops;
		this.shopService = new ShopService();
		
		this.error = "";
		this.successful = true;
		
		this.filter = "Все";
		
		makeAutoObservable(this);
	}
	
	getCountByCategoryId = (id: string) => {
		let count = 0;
		
		for (const shop of this.shops) {
			if (shop.categories.find(shop => shop.id === id)) {
				++count;
			}
		}
		
		return count;
	};
	
	getByCategory = (id: string) => {
		return this.shops.filter(shop => {
			return shop.categories.find(category => category.id === id);
		});
	};
	
	getCount = () => {
		return this.shops.length;
	};
	
	get = () => {
		return toJS(this.shops);
	};

	getFiltered = () => {
		if (this.filter === "Все") {
			return this.shops;
		}
		
		return this.shops.filter(shop => shop.categories.find(
			category => category.title === this.filter
		));
	};
	
	setFilter = (filter: string) => {
		this.filter = filter;
	};
	
	getFilter = () => {
		return this.filter;
	};
	
	invokeError = (error: string) => {
		this.error = error;
		this.successful = false;
		console.error(this.error);
	};
	
	getShopsAsync = async () => {
		try {
			const query = "";
			const data = await this.shopService.get(query);
			
			runInAction(() => {
				this.shops = data;
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	createShopAsync = async (newShop: CreateShop) => {
		try {
			const data = await this.shopService.post(newShop);
			
			runInAction(() => {
				this.shops.push(data);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	updateShopAsync = async (shop: UpdateShop) => {
		try {
			const data = await this.shopService.put(shop);
			
			runInAction(() => {
				this.shops = this.shops.map(shop => shop.id === data.id ? data : shop);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	deleteShopAsync = async (shop: DeleteShop) => {
		try {
			const data = await this.shopService.delete(shop);
			
			runInAction(() => {
				this.shops = this.shops.filter(shop => shop.id !== data.id);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
}

export default new ShopStore();