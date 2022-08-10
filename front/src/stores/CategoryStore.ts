import categories from "../data/categories";
import Store from "./Store";
import CreateCategory from "../api/interfaces/category/CreateCategory";
import UpdateCategory from "../api/interfaces/category/UpdateCategory";
import DeleteCategory from "../api/interfaces/category/DeleteCategory";
import CategoryService from "../api/services/CategoryService";
import Category from "../api/interfaces/category/Category";

class CategoryStore extends Store<Category, CreateCategory, UpdateCategory, DeleteCategory> {
	constructor() {
		super(new CategoryService(), categories);
	}
}

export default new CategoryStore();