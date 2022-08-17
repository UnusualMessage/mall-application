import {FormRule} from "antd";

import Image from "../api/interfaces/image/Image";
import Shop from "../api/interfaces/shop/Shop";

export interface Values {
	title: string,
	floor: number,
	schedule: string,
	phone: string,
	site: string,
	description: string
	categoryId: string,
	image: Image,
}

export const getShopInitialValues = (shop?: Shop) => {
	return {
		image: shop?.image,
		title: shop?.title,
		floor: shop?.floor ?? 1,
		schedule: shop?.schedule,
		phone: shop?.phone,
		site: shop?.site,
		categoryId: shop?.category.id,
		description: shop?.description,
	};
};

interface Option {
	name: string,
	placeholder: string,
	label: string,
	rules?: FormRule[]
}

type Options = Record<keyof Values, Option>;

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
		
		categoryId: {
			name: "categoryId",
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
