import Category from "../category/Category";
import Image from "../image/Image";
import {Social} from "../social";
import Cell from "../cell/Cell";

export default interface Shop {
	id: string,
	title: string,
	description: string,
	schedule: string,
	phone: string,
	site: string,
	link: string,
	routePath: string,

	cell: Omit<Cell, "path">,
	socials: Social[],
	category: Category,
	image: Image
}