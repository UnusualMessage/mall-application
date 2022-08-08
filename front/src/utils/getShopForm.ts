import Shop from "../api/interfaces/shop/Shop";

const getShopForm = (shop?: Shop) => {
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
		
		category: {
			type: "text",
			value: shop?.categories[1].title
		},
	};
};

export default getShopForm;