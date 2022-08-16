import Discount from "../api/interfaces/discount/Discount";

export interface Values {
	image: string,
	title: string,
	description: string,
	shop: string,
}

export const getDiscountInitialValues = (discount?: Discount) => {
	return {
		image: discount?.image,
		title: discount?.title,
		shop: discount?.shop.id,
		description: discount?.description,
	};
};

export const getDiscountInitialOptions = () => {
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
