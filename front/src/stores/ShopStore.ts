import {action, makeObservable, observable} from "mobx";

import Filterable from "../types/Filterable";
import UpdateShop from "../api/interfaces/shop/UpdateShop";
import CreateShop from "../api/interfaces/shop/CreateShop";
import Shop from "../api/interfaces/shop/Shop";
import ShopService from "../api/services/ShopService";
import Category from "../api/interfaces/category/Category";

import Store, {storeProps} from "./Store";

class ShopStore extends Store<Shop, CreateShop, UpdateShop> implements Filterable {
	filter: Category;
	
	constructor() {
		super(new ShopService(), []);
		
		this.filter = {
			id: "0",
			title: "Все"
		};
		
		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
			getAsync: action,
		});
	}
	
	public getCountByCategoryId = (id: string) => {
		if (id === "1") {
			return this.data.length;
		}
		
		let count = 0;
		
		for (const shop of this.data) {
			if (shop.category.id === id) {
				++count;
			}
		}
		
		return count;
	};
	
	public getByCategory = (id: string) => {
		return this.data.filter(shop => {
			return shop.category.id === id;
		});
	};
	
	public getFiltered = () => {
		if (this.filter.id === "0") {
			return this.data;
		}
		
		return this.data.filter(shop => shop.category.id === this.filter.id);
	};
	
	public getFilter = () => {
		return this.filter.title;
	};
	
	public setFilter = (id: string, title: string) => {
		this.filter = {
			id,
			title
		};
	};
}

export default new ShopStore();