import {makeAutoObservable, runInAction, toJS} from "mobx";

import Shop from "../api/interfaces/shop/Shop";
import ShopService from "../api/services/ShopService";
import NewShop from "../api/interfaces/shop/NewShop";
import Filterable from "../types/Filterable";

import shops from "../data/shops";

class ShopStore implements Filterable {
	shops: Shop[] = [];
	
	shopService: ShopService;
	
	status = "";
	filter = "Все";
	
	constructor() {
		this.shops = shops;
		this.shopService = new ShopService();
		
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