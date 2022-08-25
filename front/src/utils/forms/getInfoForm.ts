import {Contacts} from "../../api/interfaces/contacts";
import {Options} from "../../types/Options";

export interface Values {
	phone: string,
	street: string,
	city: string,
	schedule: string
}

export const getContactsInitialValues = (contacts?: Contacts) => {
	return {
		phone: contacts?.phone,
		street: contacts?.street,
		city: contacts?.city,
		schedule: contacts?.schedule
	};
};

export const getContactsInitialOptions = (): Options<Values> => {
	return {
		phone: {
			name: "phone",
			placeholder: "Введите номер телефона",
			label: "Телефон",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		street: {
			name: "street",
			placeholder: "Введите улицу",
			label: "Улица",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		city: {
			name: "city",
			placeholder: "Введите город",
			label: "Город",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
		
		schedule: {
			name: "schedule",
			placeholder: "Введите время работы",
			label: "Время работы",
			rules: [
				{ required: true, message: "Обязательно для заполнения" }
			]
		},
	};
};
