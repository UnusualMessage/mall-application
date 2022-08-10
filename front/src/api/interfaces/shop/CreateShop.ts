export default interface CreateShop extends Record<Key, Value> {
	image: File,
	categoryIds: string[],
	floor: number,
	title: string,
	description: string,
	schedule?: string,
	phone?: string,
	site?: string,
	link: string,
	routeName: string
}

type Key = string;
type Value = string | string[] | File | number | undefined;
