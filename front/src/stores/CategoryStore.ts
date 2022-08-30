import {makeObservable} from "mobx";

import { Category, UpdateCategory, CreateCategory } from "../api/interfaces/category";
import CategoryService from "../api/services/CategoryService";

import { storeProps } from "./base/Store";
import { Store } from "./base";

class CategoryStore extends Store<Category, CreateCategory, UpdateCategory> {
	constructor() {
		super(new CategoryService(), []);
		
		makeObservable(this, {
			...storeProps,
		});
	}
}

export default new CategoryStore();