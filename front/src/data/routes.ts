import shopsData from "./shops";
import discountsData from "./discounts";
import eventsData from "./events";

import Route from "../types/Route";

import {discounts, events, home, info, map, shops} from "./breadcrumbs";

export const routes: Route[] = [
	{
		path: home.route,
	},
	
	{
		path: "/" + shops.route,
	},
	
	{
		path: "/" + discounts.route,
	},
	
	{
		path: "/" + events.route,
	},
	
	{
		path: "/" + map.route,
	},
	
	{
		path: "/" + info.route,
	},
];

shopsData.forEach(shop => routes.push({ path: "/" + shop.route }));
discountsData.forEach(discount => routes.push({ path: "/" + discount.route }));
eventsData.forEach(event => routes.push({path: "/" + event.route}));
