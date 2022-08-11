import Shop from "../api/interfaces/shop/Shop";
import {Options} from "../hooks/useForm";

interface InitialValue {
	value?: string,
	options: Options,
	exclude?: boolean
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getShopForm = (shop?: Shop): Returns => {
	return {
		image: {
			value: shop?.image,
			options: {
				name: "image",
				placeholder: "Выберите логотип магазина",
				label: "Логотип"
			},
			exclude: true
		},
		
		title: {
			value: shop?.title,
			options: {
				name: "title",
				placeholder: "Введите название магазина",
				label: "Название"
			}
		},
		
		floor: {
			value: shop?.floor,
			options: {
				name: "floor",
				placeholder: "Введите номер этажа",
				label: "Этаж"
			}
		},
		
		schedule: {
			value: shop?.schedule,
			options: {
				name: "schedule",
				placeholder: "Введите время работы",
				label: "Время работы"
			}
		},
		
		phone: {
			value: shop?.phone,
			options: {
				name: "phone",
				placeholder: "Введите номер телефона",
				label: "Телефон"
			}
		},
		
		site: {
			value: shop?.site,
			options: {
				name: "site",
				placeholder: "Введите адрес сайта",
				label: "Сайт"
			}
		},
		
		category: {
			value: shop?.categories[0].id,
			options: {
				name: "category",
				placeholder: "Выберите категорию",
				label: "Категория"
			}
		},
		
		description: {
			value: shop?.description,
			options: {
				name: "description",
				placeholder: "Введите текст статьи",
				label: "Текст статьи"
			}
		}
	};
};

export default getShopForm;