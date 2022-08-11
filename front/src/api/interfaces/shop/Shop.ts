import Category from "../category/Category";

export default interface Shop {
	id: string,
	image: string,
	categories: Category[],
	floor: string,
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string
}