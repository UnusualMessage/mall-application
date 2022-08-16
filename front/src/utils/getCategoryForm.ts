import Category from "../api/interfaces/category/Category";

export interface Values {
	title: string,
}

export const getCategoryInitialValues = (category?: Category) => {
	return {
		title: category?.title,
	};
};

export const getCategoryInitialOptions = () => {
	return {
		title: {
			name: "title",
			placeholder: "Введите название категории",
			label: "Название",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
	};
};
