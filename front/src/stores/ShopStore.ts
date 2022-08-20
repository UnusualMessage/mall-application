import {action, makeObservable, observable} from "mobx";

import { Shop, CreateShop, UpdateShop } from "../api/interfaces/shop";
import { Category } from "../api/interfaces/category";
import ShopService from "../api/services/ShopService";
import Filterable from "../types/Filterable";

import Store, {storeProps} from "./Store";

class ShopStore extends Store<Shop, CreateShop, UpdateShop> implements Filterable {
	public filter: Category | undefined;

	constructor() {
		super(new ShopService(), []);
		
		this.filter = undefined;
		
		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
			getAsync: action,
		});
	}
	
	public getCountByCategoryId = (id: string) => {
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
		const filter = this.filter;
		
		if (filter) {
			return this.data.filter(shop => shop.category.id === filter.id);
		}
		
		return this.data;
	};
	
	public getFilter = () => {
		return this.filter;
	};
	
	public setFilter = (category: Category | undefined) => {
		if (category) {
			this.filter = { ...category };
		} else {
			this.filter = undefined;
		}
	};
}

export default new ShopStore();