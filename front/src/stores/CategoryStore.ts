import {makeObservable} from "mobx";

import CreateCategory from "../api/interfaces/category/CreateCategory";
import UpdateCategory from "../api/interfaces/category/UpdateCategory";
import CategoryService from "../api/services/CategoryService";
import Category from "../api/interfaces/category/Category";

import Store, {storeProps} from "./Store";

class CategoryStore extends Store<Category, CreateCategory, UpdateCategory> {
	constructor() {
		super(new CategoryService(), []);
		
		makeObservable(this, {
			...storeProps,
		});
	}
}

export default new CategoryStore();