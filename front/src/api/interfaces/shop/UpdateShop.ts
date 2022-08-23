import {Social} from "../social";

export default interface UpdateShop {
	id: string,
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string,
	
	socials: Social[],
	cellId: string,
	categoryId: string,
	imageId: string,
}