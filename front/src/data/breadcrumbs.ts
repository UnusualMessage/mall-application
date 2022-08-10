import Breadcrumb from "../types/Breadcrumb";

import shopsData from "./shops";
import discountsData from "./discounts";
import eventsData from "./events";

export const breadcrumbs: Breadcrumb[] = [];

export const home = {
	name: "Главная",
	route: "/"
};

export const shops = {
	name: "Магазины",
	route: "shops"
};

export const discounts = {
	name: "Акции и скидки",
	route: "discounts"
};

export const events = {
	name: "События и новости",
	route: "events"
};

export const map = {
	name: "Карта ТЦ",
	route: "map"
};

export const info = {
	name: "Информация",
	route: "info"
};

breadcrumbs.push(...[home, shops, discounts, events, map, info]);

shopsData.forEach(shop => breadcrumbs.push({ name: shop.title, route: shop.link }));
discountsData.forEach(discount => breadcrumbs.push({ name: discount.title, route: discount.link }));
eventsData.forEach(event => breadcrumbs.push({name: event.title, route: event.link}));

