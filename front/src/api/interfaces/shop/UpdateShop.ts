export default interface UpdateShop {
	id: string,
	image?: string,
	categories?: string[],
	floor?: number,
	title?: string,
	description?: string,
	schedule?: string,
	phone?: string,
	site?: string,
	link?: string,
	routePath?: string
}