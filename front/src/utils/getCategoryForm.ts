import Category from "../api/interfaces/category/Category";

interface InitialValue {
	type: string,
	value?: string
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getCategoryForm = (category?: Category): Returns => {
	return {
		title: {
			type: "text",
			value: category?.title
		},
	};
};

export default getCategoryForm;