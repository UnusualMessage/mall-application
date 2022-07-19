import { makeAutoObservable, runInAction } from "mobx";

import DiscountService from "../api/services/DiscountService";
import Discount from "../api/interfaces/discount/Discount";
import NewDiscount from "../api/interfaces/discount/NewDiscount";
import Filterable from "../types/Filterable";

import discounts from "../data/discounts";

class DiscountStore implements Filterable {
	discounts: Discount[] = [];
	
	discountService: DiscountService;
	
	status = "";
	filter = "Все";
	
	constructor() {
		this.discounts = discounts;
		this.discountService = new DiscountService();
		
		makeAutoObservable(this);
	}
	
	get = () => {
		if (this.filter === "Все") {
			return this.discounts;
		}
		
		return this.discounts.filter(discount => discount.category === this.filter);
	};
	
	setFilter = (filter: string) => {
		this.filter = filter;
	};
	
	getFilter = () => {
		return this.filter;
	};
	
	getDiscountsAsync = async () => {
		try {
			const query = "";
			const data = await this.discountService.get(query);
			
			runInAction(() => {
				this.discounts = data;
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	createDiscountAsync = async (newDiscount: NewDiscount) => {
		try {
			const data = await this.discountService.post(newDiscount);
			
			runInAction(() => {
				this.discounts.push(data);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	updateDiscountAsync = async (discount: Discount) => {
		try {
			const data = await this.discountService.put(discount);
			
			runInAction(() => {
				this.discounts = this.discounts.map(discount => discount.id === data.id ? data : discount);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	deleteDiscountAsync = async (id: string) => {
		try {
			const data = await this.discountService.delete(id);
			
			runInAction(() => {
				this.discounts = this.discounts.filter(discount => discount.id !== data.id);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
}

export default new DiscountStore();