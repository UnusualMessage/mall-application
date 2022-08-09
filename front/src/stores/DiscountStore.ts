import {action, makeObservable, observable} from "mobx";

import DiscountService from "../api/services/DiscountService";
import Discount from "../api/interfaces/discount/Discount";
import CreateDiscount from "../api/interfaces/discount/CreateDiscount";
import Filterable from "../types/Filterable";

import UpdateDiscount from "../api/interfaces/discount/UpdateDiscount";
import DeleteDiscount from "../api/interfaces/discount/DeleteDiscount";
import Store, {storeProps} from "./Store";
import discounts from "../data/discounts";

class DiscountStore extends Store<Discount, CreateDiscount, UpdateDiscount, DeleteDiscount>
					implements Filterable {
	filter: string;
	
	constructor() {
		super(new DiscountService(), discounts);

		this.filter = "Все";
		
		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
		});
	}
	
	public getCountByCategoryId = (id: string) => {
		let count = 0;
		
		for (const discount of this.data) {
			if (discount.shop.categories.find(category => category.id === id)) {
				++count;
			}
		}
		
		return count;
	};
	
	public getFilter = () => {
		return this.filter;
	};
	
	public getFiltered = () => {
		if (this.filter === "Все") {
			return this.data;
		}
		
		return this.data.filter(discount => discount.shop.categories.find(
			category => category.title === this.filter
		));
	};
	
	public getDiscountsByShopId = (id: string) => {
		return this.data.filter(discount => discount.shop.id === id);
	};
	
	public setFilter = (filter: string) => {
		this.filter = filter;
	};
}

export default new DiscountStore();