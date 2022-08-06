import {makeAutoObservable, runInAction} from "mobx";

import DiscountService from "../api/services/DiscountService";
import Discount from "../api/interfaces/discount/Discount";
import CreateDiscount from "../api/interfaces/discount/CreateDiscount";
import Filterable from "../types/Filterable";
import Store from "../types/Store";

import discounts from "../data/discounts";
import UpdateDiscount from "../api/interfaces/discount/UpdateDiscount";
import DeleteDiscount from "../api/interfaces/discount/DeleteDiscount";

class DiscountStore implements Filterable, Store {
	discounts: Discount[] = [];
	
	discountService: DiscountService;
	
	error: string;
	successful: boolean;
	
	filter: string;
	
	constructor() {
		this.discounts = discounts;
		this.discountService = new DiscountService();
		
		this.error = "";
		this.successful = true;
		
		this.filter = "Все";
		
		makeAutoObservable(this);
	}
	
	getCountByCategoryId = (id: string) => {
		let count = 0;
		
		for (const discount of this.discounts) {
			if (discount.shop.categories.find(category => category.id === id)) {
				++count;
			}
		}
		
		return count;
	};
	
	get = () => {
		return this.discounts;
	};
	
	getCount = () => {
		return this.discounts.length;
	};
	
	setFilter = (filter: string) => {
		this.filter = filter;
	};
	
	getFilter = () => {
		return this.filter;
	};
	
	getFiltered = () => {
		if (this.filter === "Все") {
			return this.discounts;
		}
		
		return this.discounts.filter(discount => discount.shop.categories.find(
			category => category.title === this.filter
		));
	};
	
	getDiscountsByShopId = (id: string) => {
		return this.discounts.filter(discount => discount.shop.id === id);
	};
	
	invokeError = (error: string) => {
		this.error = error;
		this.successful = false;
		console.error(this.error);
	};
	
	getDiscountsAsync = async () => {
		try {
			const query = "";
			const data = await this.discountService.get(query);
			
			runInAction(() => {
				this.discounts = data;
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	createDiscountAsync = async (newDiscount: CreateDiscount) => {
		try {
			const data = await this.discountService.post(newDiscount);
			
			runInAction(() => {
				this.discounts.push(data);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	updateDiscountAsync = async (discount: UpdateDiscount) => {
		try {
			const data = await this.discountService.put(discount);
			
			runInAction(() => {
				this.discounts = this.discounts.map(discount => discount.id === data.id ? data : discount);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	deleteDiscountAsync = async (discount: DeleteDiscount) => {
		try {
			const data = await this.discountService.delete(discount);
			
			runInAction(() => {
				this.discounts = this.discounts.filter(discount => discount.id !== data.id);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
}

export default new DiscountStore();