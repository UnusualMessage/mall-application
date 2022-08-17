export default interface CreateShop extends Record<Key, Value> {
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
}

type Key = string;
type Value = string | number | undefined;
