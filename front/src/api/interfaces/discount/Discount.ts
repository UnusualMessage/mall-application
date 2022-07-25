import Category from "../category/Category";

export default interface Discount {
	id: string,
	title: string,
	image: string,
	link: string,
	route: string,
	categories: Category[]
}