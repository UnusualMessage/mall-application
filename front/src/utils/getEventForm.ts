import Event from "../api/interfaces/event/Event";
import {Options} from "../hooks/useForm";

interface InitialValue {
	value?: string,
	options: Options,
	exclude?: boolean
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getEventForm = (event?: Event): Returns => {
	return {
		image: {
			value: event?.image,
			options: {
				name: "image",
				placeholder: "Выберите заглавное изображение",
				label: "Изображение"
			},
			exclude: true
		},
		
		title: {
			value: event?.title,
			options: {
				name: "title",
				placeholder: "Введите заголовок статьи",
				label: "Заголовок"
			}
		},
		
		description: {
			value: event?.description,
			options: {
				name: "description",
				placeholder: "Введите текст статьи",
				label: "Текст статьи"
			}
		},
		
		shop: {
			value: event?.shop.id,
			options: {
				name: "shop",
				placeholder: "Выберите магазин",
				label: "Магазин"
			}
		},
	};
};

export default getEventForm;