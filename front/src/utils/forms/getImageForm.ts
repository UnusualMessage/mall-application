import {UploadFile} from "antd";

export interface Values {
	image: UploadFile[],
}

export const getImageInitialOptions = () => {
	return {
		title: {
			name: "image",
			placeholder: "Выберите изображение",
			label: "Изображение",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
	};
};
