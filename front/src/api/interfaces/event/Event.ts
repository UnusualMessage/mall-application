import Shop from "../shop/Shop";

export default interface Event {
	id: string,
	title: string,
	description: string,
	image: string,
	link: string,
	route: string,
	shop: Shop
}