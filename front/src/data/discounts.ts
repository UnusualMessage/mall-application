import categories from "./shopCategories";

const discounts = [
	{
		id: "1",
		title: "Распродажа",
		image: "./images/discounts/dm_knigi_1200_auto_jpg.jpg",
		link: "dm_knigi",
		category: categories[1].title
	},
	
	{
		id: "2",
		title: "Распродажа",
		image: "./images/discounts/dm_malyshi_new_1200_auto_jpg.jpg",
		link: "dm_malyshi",
		category: categories[1].title
	},
	
	{
		id: "3",
		title: "Товары для дачи",
		image: "./images/discounts/el_dorado_dacha_1200_auto_jpg.jpg",
		link: "el_dorado_dacha",
		category: categories[8].title
	},
	
	{
		id: "4",
		title: "Самокаты",
		image: "./images/discounts/el_dorado_samokaty_1200_auto_jpg.jpg",
		link: "el_dorado_samokaty",
		category: categories[8].title
	},
];

export default discounts;