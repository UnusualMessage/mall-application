import {Options} from "../hooks/useForm";
import Discount from "../api/interfaces/discount/Discount";

interface InitialValue {
	value?: string,
	options: Options,
	exclude?: boolean
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getDiscountForm = (discount?: Discount): Returns => {
	return {
		image: {
			value: discount?.image,
			options: {
				name: "image",
				placeholder: "Выберите заглавное изображение",
				label: "Изображение"
			},
			exclude: true
		},
		
		title: {
			value: discount?.title,
			options: {
				name: "title",
				placeholder: "Введите заголовок статьи",
				label: "Заголовок"
			}
		},
		
		description: {
			value: discount?.description,
			options: {
				name: "description",
				placeholder: "Введите текст статьи",
				label: "Текст статьи"
			}
		},
		
		shop: {
			value: discount?.shop.id,
			options: {
				name: "shop",
				placeholder: "Выберите магазин",
				label: "Магазин"
			}
		},
	};
};

export default getDiscountForm;