import Shop from "../shop/Shop";

export default interface Discount {
	id: string,
	title: string,
	image: string,
	link: string,
	routePath: string,
	description: string,
	shop: Shop
}