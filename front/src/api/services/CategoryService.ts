import Service from "./Service";
import Category from "../interfaces/category/Category";
import CreateCategory from "../interfaces/category/CreateCategory";
import UpdateCategory from "../interfaces/category/UpdateCategory";
import DeleteCategory from "../interfaces/category/DeleteCategory";

class CategoryService extends Service<Category, CreateCategory, UpdateCategory, DeleteCategory> {
	constructor() {
		super("https://localhost:44333/api/categories/");
	}
}

export default CategoryService;