export default interface Filterable {
	setFilter(id: string, title: string): void;
	getFilter(): string;
	getCountByCategoryId(id: string): number;
}