import icons from "./icons";
import {DiscountsRoute, EventsRoute, HomeRoute, InfoRoute, MapRoute, ShopsRoute} from "./routes";

const navs = [
	{
		title: HomeRoute.name,
		to: HomeRoute.route,
		icon: icons.home,
		viewBox: "0 0 176.532 176.532"
	},
	
	{
		title: ShopsRoute.name,
		to: ShopsRoute.route,
		icon: icons.shops,
		viewBox: "0 0 24 24"
	},
	
	{
		title: DiscountsRoute.name,
		to: DiscountsRoute.route,
		icon: icons.discounts,
		viewBox: "0 0 24 24"
	},
	
	{
		title: EventsRoute.name,
		to: EventsRoute.route,
		icon: icons.events,
		viewBox: "0 0 24 24"
	},
	
	{
		title: MapRoute.name,
		to: MapRoute.route,
		icon: icons.map,
		viewBox: "0 0 24 24"
	},
	
	{
		title: InfoRoute.name,
		to: InfoRoute.route,
		icon: icons.contacts,
		viewBox: "0 0 24 24"
	},
];

export default navs;