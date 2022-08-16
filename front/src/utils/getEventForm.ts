import {UploadFile} from "antd";

import Event from "../api/interfaces/event/Event";

export interface Values {
	image: UploadFile[],
	title: string,
	description: string,
	shop: string,
}

export const getEventInitialValues = (event?: Event) => {
	return {
		title: event?.title,
		shop: event?.shop.id,
		description: event?.description,
	};
};

export const getEventInitialOptions = () => {
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
		
		shop: {
			name: "shop",
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
