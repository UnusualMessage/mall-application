export default interface CreateShop extends Record<Key, Value> {
	image: string,
	categoryIds: string[],
	floor: number,
	title: string,
	description: string,
	schedule?: string,
	phone?: string,
	site?: string,
	link: string,
	routePath: string
}

type Key = string;
type Value = string | string[] | File | number | undefined;
