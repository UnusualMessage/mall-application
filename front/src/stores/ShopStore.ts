import {action, makeObservable, observable} from "mobx";

import Filterable from "../types/Filterable";
import Store, {storeProps} from "./Store";
import UpdateShop from "../api/interfaces/shop/UpdateShop";
import DeleteShop from "../api/interfaces/shop/DeleteShop";
import CreateShop from "../api/interfaces/shop/CreateShop";
import Shop from "../api/interfaces/shop/Shop";
import ShopService from "../api/services/ShopService";
import shops from "../data/shops";

class ShopStore extends Store<Shop, CreateShop, UpdateShop, DeleteShop> implements Filterable {
	filter: string;
	
	constructor() {
		super(new ShopService(), shops);
		
		this.filter = "Все";
		
		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
		});
	}
	
	public getCountByCategoryId = (id: string) => {
		let count = 0;
		
		for (const shop of this.data) {
			if (shop.categories.find(shop => shop.id === id)) {
				++count;
			}
		}
		
		return count;
	};
	
	public getByCategory = (id: string) => {
		return this.data.filter(shop => {
			return shop.categories.find(category => category.id === id);
		});
	};
	
	public getFiltered = () => {
		if (this.filter === "Все") {
			return this.data;
		}
		
		return this.data.filter(shop => shop.categories.find(
			category => category.title === this.filter
		));
	};
	
	public getFilter = () => {
		return this.filter;
	};
	
	public setFilter = (filter: string) => {
		this.filter = filter;
	};
}

export default new ShopStore();