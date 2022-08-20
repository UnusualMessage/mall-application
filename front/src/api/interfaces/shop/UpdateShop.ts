import {Social} from "../social";

export default interface UpdateShop {
	id: string,
	floor: number,
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string,
	
	socials: Social[]
	categoryId: string,
	imageId: string,
}