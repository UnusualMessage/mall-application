import categories from "./categories";
import Discount from "../api/interfaces/discount/Discount";

const baseCategory = categories[0];

const discounts: Discount[] = [
	{
		id: "1",
		title: "Распродажа",
		image: "/images/discounts/dm_knigi_1200_auto_jpg.jpg",
		link: "dm_knigi",
		route: "discounts/dm_knigi",
		categories: [baseCategory, categories[1]],
	},
	
	{
		id: "2",
		title: "Распродажа",
		image: "/images/discounts/dm_malyshi_new_1200_auto_jpg.jpg",
		link: "dm_malyshi",
		route: "discounts/dm_malyshi",
		categories: [baseCategory, categories[1]],
	},
	
	{
		id: "3",
		title: "Товары для дачи",
		image: "/images/discounts/el_dorado_dacha_1200_auto_jpg.jpg",
		link: "el_dorado_dacha",
		route: "discounts/el_dorado_dacha",
		categories: [baseCategory, categories[8]],
	},
	
	{
		id: "4",
		title: "Самокаты",
		image: "/images/discounts/el_dorado_samokaty_1200_auto_jpg.jpg",
		link: "el_dorado_samokaty",
		route: "discounts/el_dorado_samokaty",
		categories: [baseCategory, categories[8]],
	},
];

export default discounts;