import {CreateSocial} from "../social";

export default interface CreateShop {
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string
	
	imageId: string,
	categoryId: string,
	cellId: string,
	galleryIds: string[],
	socials: CreateSocial[]
}
