import {action, makeObservable, observable} from "mobx";

import DiscountService from "../api/services/DiscountService";
import Discount from "../api/interfaces/discount/Discount";
import CreateDiscount from "../api/interfaces/discount/CreateDiscount";
import Filterable from "../types/Filterable";
import UpdateDiscount from "../api/interfaces/discount/UpdateDiscount";
import Category from "../api/interfaces/category/Category";

import Store, {storeProps} from "./Store";

class DiscountStore extends Store<Discount, CreateDiscount, UpdateDiscount> implements Filterable {
	public filter: Category;
	private readonly defaultFilter = {
		id: "0",
		title: "Все"
	};
	
	constructor() {
		super(new DiscountService(), []);

		this.filter = this.defaultFilter;
		
		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
		});
	}
	
	public getCountByCategoryId = (id: string) => {
		if (id === "1") {
			return this.data.length;
		}
		
		let count = 0;
		
		for (const discount of this.data) {
			if (discount.shop.category.id === id) {
				++count;
			}
		}
		
		return count;
	};
	
	public getFilter() {
		return this.filter.title;
	}
	
	public getFiltered() {
		if (this.filter.id === "0") {
			return this.data;
		}
		
		return this.data.filter(discount => discount.shop.category.id === this.filter.id);
	}
	
	public getDiscountsByShopId = async (id: string) => {
		await this.getAsync(`shopId=${id}`);
		return this.data;
	};
	
	public setFilter = (id: string, title: string) => {
		this.filter = {
			id,
			title
		};
	};
}

export default new DiscountStore();