import {action, makeObservable, observable} from "mobx";

import { Discount, CreateDiscount, UpdateDiscount } from "../api/interfaces/discount";
import { Category } from "../api/interfaces/category";
import Filterable from "../types/Filterable";
import DiscountService from "../api/services/DiscountService";

import Store, {storeProps} from "./base/Store";

class DiscountStore extends Store<Discount, CreateDiscount, UpdateDiscount> implements Filterable {
	public filter: Category | undefined;

	constructor() {
		super(new DiscountService(), []);
		
		this.filter = undefined;

		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
		});
	}
	
	public getCountByCategoryId = (id: string) => {
		let count = 0;
		
		for (const discount of this.data) {
			if (discount.shop.category.id === id) {
				++count;
			}
		}
		
		return count;
	};
	
	public getFilter() {
		return this.filter;
	}
	
	public getFiltered() {
		const filter = this.filter;
		
		if (filter) {
			return this.data.filter(discount => discount.shop.category.id === filter.id);
		}
		
		return this.data;
	}
	
	public setFilter = (category: Category | undefined) => {
		if (category) {
			this.filter = { ...category };
		} else {
			this.filter = undefined;
		}
	};
	
	public getDiscountsByShopId = async (id: string) => {
		await this.getAsync(`Filters=shopId==${id}`);
		return this.data;
	};
}

export default new DiscountStore();