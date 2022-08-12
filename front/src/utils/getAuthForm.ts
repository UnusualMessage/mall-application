import {Options} from "../hooks/useForm";

interface InitialValue {
	value?: string,
	options: Options,
	exclude?: boolean
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getAuthForm = (): Returns => {
	return {
		login: {
			value: "",
			options: {
				name: "login",
				placeholder: "Введите логин",
				label: "Логин"
			},
		},
		
		password: {
			value: "",
			options: {
				name: "password",
				placeholder: "Введите пароль",
				label: "Пароль"
			}
		}
	};
};

export default getAuthForm;