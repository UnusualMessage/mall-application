import {Category} from "../api/interfaces/category";

export default interface Filterable {
	setFilter(category: Category | undefined): void;
	getFilter(): Category | undefined;
	getCountByCategoryId(id: string): number;
}