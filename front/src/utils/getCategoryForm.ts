import Category from "../api/interfaces/category/Category";
import {Options} from "../hooks/useForm";

interface InitialValue {
	value?: string,
	options: Options,
	exclude?: boolean
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getCategoryForm = (category?: Category): Returns => {
	return {
		title: {
			value: category?.title,
			options: {
				name: "title",
				placeholder: "Введите название категории",
				label: "Название"
			}
		},
	};
};

export default getCategoryForm;