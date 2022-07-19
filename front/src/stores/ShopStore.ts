import { makeAutoObservable, runInAction } from "mobx";

import Shop from "../api/interfaces/shop/Shop";
import ShopService from "../api/services/ShopService";
import NewShop from "../api/interfaces/shop/NewShop";
import Category from "../api/interfaces/category/Category";
import Filterable from "../types/Filterable";

import shops from "../data/shops";
import shopCategories from "../data/shopCategories";

class ShopStore implements Filterable {
	shops: Shop[] = [];
	categories: Category[] = [];
	
	shopService: ShopService;
	
	status = "";
	filter = "Все";
	
	constructor() {
		this.shops = shops;
		this.categories = shopCategories;
		this.shopService = new ShopService();
		
		makeAutoObservable(this);
	}
	
	get = () => {
		if (this.filter === "Все") {
			return this.shops;
		}
		
		return this.shops.filter(shop => shop.category === this.filter);
	};
	
	getCategories = () => {
		return this.categories;
	};
	
	setFilter = (filter: string) => {
		this.filter = filter;
	};
	
	getFilter = () => {
		return this.filter;
	};
	
	getShopsAsync = async () => {
		try {
			const query = "";
			const data = await this.shopService.get(query);
			
			runInAction(() => {
				this.shops = data;
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	createShopAsync = async (newShop: NewShop) => {
		try {
			const data = await this.shopService.post(newShop);
			
			runInAction(() => {
				this.shops.push(data);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	updateShopAsync = async (shop: Shop) => {
		try {
			const data = await this.shopService.put(shop);
			
			runInAction(() => {
				this.shops = this.shops.map(element => element.id === data.id ? data : element);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	deleteShopAsync = async (id: string) => {
		try {
			const data = await this.shopService.delete(id);
			
			runInAction(() => {
				this.shops = this.shops.filter(shop => shop.id !== data.id);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
}

export default new ShopStore();