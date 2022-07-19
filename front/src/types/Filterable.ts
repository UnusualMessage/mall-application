export default interface Filterable {
	setFilter(filter: string): void;
	getFilter(): string;
}