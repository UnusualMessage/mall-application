import Category from "../../api/interfaces/category/Category";
import { Options } from "../../types/Options";

export interface Values {
    title: string;
}

export const getCategoryInitialValues = (category?: Category) => {
    return {
        title: category?.title,
    };
};

export const getCategoryInitialOptions = (): Options<Values> => {
    return {
        title: {
            name: "title",
            placeholder: "Введите название категории",
            label: "Название",
            rules: [{ required: true, message: "Обязательно для заполнения" }],
        },
    };
};
