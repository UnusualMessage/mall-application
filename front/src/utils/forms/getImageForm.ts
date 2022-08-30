import {UploadFile} from "antd";
import {Options} from "../../types/Options";

export interface Values {
	image: UploadFile[],
}

export const getImageInitialOptions = (): Options<Values> => {
	return {
		image: {
			name: "image",
			placeholder: "Выберите изображение",
			label: "Изображение",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
	};
};
