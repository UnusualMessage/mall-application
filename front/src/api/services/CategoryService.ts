import Service from "./Service";
import Category from "../interfaces/category/Category";
import CreateCategory from "../interfaces/category/CreateCategory";
import UpdateCategory from "../interfaces/category/UpdateCategory";

class CategoryService extends Service<Category, CreateCategory, UpdateCategory> {
	constructor() {
		super("/api/categories");
	}
}

export default CategoryService;