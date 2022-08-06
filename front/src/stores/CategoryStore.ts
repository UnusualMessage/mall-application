import {makeAutoObservable} from "mobx";

import Category from "../api/interfaces/category/Category";

import categories from "../data/categories";

class CategoryStore {
	categories: Category[];
	
	constructor() {
		this.categories = categories;
		
		makeAutoObservable(this);
	}
	
	get = () => {
		return this.categories;
	};
}

export default new CategoryStore();