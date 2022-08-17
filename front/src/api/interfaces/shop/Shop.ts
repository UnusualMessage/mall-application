import Category from "../category/Category";
import Image from "../image/Image";

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
	
	category: Category,
	image: Image
}