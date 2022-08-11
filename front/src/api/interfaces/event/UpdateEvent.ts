export default interface UpdateEvent {
	id: string,
	title: string,
	description: string,
	image: File,
	link: string,
	routePath: string,
	shopId: string
}