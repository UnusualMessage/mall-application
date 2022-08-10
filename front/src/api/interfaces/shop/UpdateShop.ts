export default interface UpdateShop {
	id: string,
	image?: File,
	categories?: string[],
	floor?: string,
	title?: string,
	description?: string,
	schedule?: string,
	phone?: string,
	site?: string,
	link?: string,
	route?: string
}