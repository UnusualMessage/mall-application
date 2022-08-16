export interface Values {
	login: string,
	password: string
}

export const getAuthInitialOptions = () => {
	return {
		login: {
			name: "login",
			placeholder: "Введите логин",
			label: "Логин",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		password: {
			name: "password",
			placeholder: "Введите пароль",
			label: "Пароль",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
	};
};
