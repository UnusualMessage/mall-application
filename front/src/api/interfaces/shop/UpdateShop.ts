import {ShopSocial} from "../../../types/Social";

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
	
	socials: ShopSocial[]
	categoryId: string,
	imageId: string,
}