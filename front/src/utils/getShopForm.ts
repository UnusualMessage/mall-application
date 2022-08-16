import Shop from "../api/interfaces/shop/Shop";
import {FormRule} from "antd";

export interface Values {
	image: string,
	title: string,
	floor: number,
	schedule: string,
	phone: string,
	site: string,
	category: string,
	description: string
}

export const getShopInitialValues = (shop?: Shop) => {
	return {
		image: shop?.image,
		title: shop?.title,
		floor: Number(shop?.floor),
		schedule: shop?.schedule,
		phone: shop?.phone,
		site: shop?.site,
		category: shop?.categories[1].id,
		description: shop?.description,
	};
};

interface Option {
	name: string,
	placeholder: string,
	label: string,
	rules?: FormRule[]
}

type Options = Record<string, Option>;

export const getShopInitialOptions = (): Options => {
	return {
		image: {
			name: "image",
			placeholder: "Выберите логотип магазина",
			label: "Логотип",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		title: {
			name: "title",
			placeholder: "Введите название магазина",
			label: "Название",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		floor: {
			name: "floor",
			placeholder: "Введите номер этажа",
			label: "Этаж",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		schedule: {
			name: "schedule",
			placeholder: "Введите время работы",
			label: "Время работы",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		phone: {
			name: "phone",
			placeholder: "Введите номер телефона",
			label: "Телефон",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		site: {
			name: "site",
			placeholder: "Введите адрес сайта",
			label: "Сайт",
			rules: [
				{ required: true, message: "Обязательно для заполнения" },
				{ type: "url", warningOnly: true, message: "Некорректная ссылка!" }
			]
		},
		
		category: {
			name: "category",
			placeholder: "Выберите категорию",
			label: "Категория",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		description: {
			name: "description",
			placeholder: "Введите текст статьи",
			label: "Текст статьи"
		}
	};
};
