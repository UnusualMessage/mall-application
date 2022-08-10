import icons from "./icons";
import {home, shops, discounts, events, map, info} from "./breadcrumbs";

const navs = [
	{
		title: home.name,
		to: home.route,
		icon: icons.home,
		viewBox: "0 0 176.532 176.532"
	},
	
	{
		title: shops.name,
		to: shops.route,
		icon: icons.shops,
		viewBox: "0 0 24 24"
	},
	
	{
		title: discounts.name,
		to: discounts.route,
		icon: icons.discounts,
		viewBox: "0 0 24 24"
	},
	
	{
		title: events.name,
		to: events.route,
		icon: icons.events,
		viewBox: "0 0 24 24"
	},
	
	{
		title: map.name,
		to: map.route,
		icon: icons.map,
		viewBox: "0 0 24 24"
	},
	
	{
		title: info.name,
		to: info.route,
		icon: icons.contacts,
		viewBox: "0 0 24 24"
	},
];

export default navs;