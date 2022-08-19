import {CreateSocial} from "../social";

export default interface CreateShop {
	floor: number,
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string
	
	imageId: string,
	categoryId: string,
	socials: CreateSocial[]
}
