import shops from "./shops";
import discounts from "./discounts";
import events from "./events";

export const HomeRoute = {
	name: "Главная",
	route: "/"
};

export const ShopsRoute = {
	name: "Магазины",
	route: "shops"
};

export const DiscountsRoute = {
	name: "Акции и скидки",
	route: "discounts"
};

export const EventsRoute = {
	name: "События и новости",
	route: "events"
};

export const MapRoute = {
	name: "Карта ТЦ",
	route: "map"
};

export const InfoRoute = {
	name: "Информация",
	route: "info"
};

export const routes = [
	{
		name: HomeRoute.name,
		route: HomeRoute.route
	},
	
	{
		name: ShopsRoute.name,
		route: ShopsRoute.route
	},
	
	{
		name: DiscountsRoute.name,
		route: DiscountsRoute.route
	},
	
	{
		name: EventsRoute.name,
		route: EventsRoute.route
	},
	
	{
		name: MapRoute.name,
		route: MapRoute.route
	},
	
	{
		name: InfoRoute.name,
		route: InfoRoute.route
	},
	
	{
		name: "",
		route: ""
	}
];

shops.forEach(shop => routes.push({ name: shop.title, route: shop.link }));
discounts.forEach(discount => routes.push({ name: discount.title, route: discount.link }));
events.forEach(event => routes.push({name: event.title, route: event.link}));
