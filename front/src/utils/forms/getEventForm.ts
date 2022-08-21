import Event from "../../api/interfaces/event/Event";
import Image from "../../api/interfaces/image/Image";
import {FormRule} from "antd";

export interface Values {
	title: string,
	description: string,
	shopId: string,
	image: Image,
}

export const getEventInitialValues = (event?: Event) => {
	return {
		image: event?.image,
		title: event?.title,
		shopId: event?.shop.id,
		description: event?.description,
	};
};

interface Option {
	name: string,
	placeholder: string,
	label: string,
	rules?: FormRule[]
}

type Options = Record<keyof Values, Option>;

export const getEventInitialOptions = (): Options => {
	return {
		image: {
			name: "image",
			placeholder: "Выберите основное изображение",
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
