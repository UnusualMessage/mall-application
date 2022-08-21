import {FormRule} from "antd";

import Discount from "../../api/interfaces/discount/Discount";
import Image from "../../api/interfaces/image/Image";

export interface Values {
	image: Image,
	title: string,
	description: string,
	shopId: string,
}

export const getDiscountInitialValues = (discount?: Discount) => {
	return {
		image: discount?.image,
		title: discount?.title,
		shopId: discount?.shop.id,
		description: discount?.description,
	};
};

interface Option {
	name: string,
	placeholder: string,
	label: string,
	rules?: FormRule[]
}

type Options = Record<keyof Values, Option>;

export const getDiscountInitialOptions = (): Options => {
	return {
		image: {
			name: "image",
			placeholder: "Выберите изображение",
			label: "Изображение",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		title: {
			name: "title",
			placeholder: "Введите заголовок статьи",
			label: "Заголовок",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		shopId: {
			name: "shopId",
			placeholder: "Выберите магазин",
			label: "Магазин",
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
