import Category from "../category/Category";
import Image from "../image/Image";
import {Social} from "../social";

export default interface Shop {
	id: string,
	floor: string,
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string,
	
	socials: Social[]
	category: Category,
	image: Image
}