import Shop from "../api/interfaces/shop/Shop";

interface InitialValue {
	type: string,
	value?: string
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getShopForm = (shop?: Shop): Returns => {
	return {
		title: {
			type: "text",
			value: shop?.title
		},
		
		floor: {
			type: "text",
			value: shop?.floor
		},
		
		schedule: {
			type: "text",
			value: shop?.schedule
		},
		
		phone: {
			type: "text",
			value: shop?.phone
		},
		
		site: {
			type: "text",
			value: shop?.site
		},
		
		categories: {
			type: "text",
			value: shop?.categories[1].id
		},
		
		description: {
			type: "text",
			value: shop?.description
		}
	};
};

export default getShopForm;