import {action, makeObservable, observable, runInAction} from "mobx";

import DiscountService from "../api/services/DiscountService";
import Discount from "../api/interfaces/discount/Discount";
import CreateDiscount from "../api/interfaces/discount/CreateDiscount";
import Filterable from "../types/Filterable";
import UpdateDiscount from "../api/interfaces/discount/UpdateDiscount";
import DeleteDiscount from "../api/interfaces/discount/DeleteDiscount";
import Category from "../api/interfaces/category/Category";

import Store, {storeProps} from "./Store";

class DiscountStore extends Store<Discount, CreateDiscount, UpdateDiscount, DeleteDiscount> implements Filterable {
	filter: Category;
	
	constructor() {
		super(new DiscountService(), []);

		this.filter = {
			id: "0",
			title: "Все"
		};
		
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
	
	public getFilter = () => {
		return this.filter.title;
	};
	
	public getFiltered = () => {
		if (this.filter.id === "0") {
			return this.data;
		}
		
		return this.data.filter(discount => discount.shop.category.id === this.filter.id);
	};
	
	public getDiscountsByShopId = (id: string) => {
		runInAction(async () => {
			await this.getAsync(`shopId=${id}`);
		}).then(_ => _);
		
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