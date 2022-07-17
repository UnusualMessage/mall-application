import {makeAutoObservable} from "mobx";

import Category from "../api/interfaces/category/Category";

import shopCategories from "../data/shopCategories";
import discountCategories from "../data/discountCategories";

class CategoryStore {
	shopCategories: Category[];
	discountCategories: Category[];
	
	constructor() {
		this.shopCategories = shopCategories;
		this.discountCategories = discountCategories;
		
		makeAutoObservable(this);
	}
	
	getShopCategories = () => {
		return this.shopCategories;
	};
	
	getDiscountCategories = () => {
		return this.discountCategories;
	};
}

export default new CategoryStore();