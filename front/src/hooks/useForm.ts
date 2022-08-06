import {ChangeEvent, ChangeEventHandler, FormEventHandler, useEffect, useState} from "react";

const useForm = ({ form }: Props) => {
	const [fields, setFields] = useState(form);
	
	useEffect(() => {
		const fieldsArray = Object.entries(form).map(item => {
			const name = item[0];
			const field = item[1];
			
			return {
				[name]: {
					...field,
					value: field.value ?? "",
					onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, name)
				}
			};
		});
		
		const fields = fieldsArray.reduce((prev, current) => {
			return {
				...prev,
				...current
			};
		}, {});
		
		setFields(fields);
	}, []);
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>, name: Name) => {
		const field = fields[name];
		field.value = e.target.value;
		
		setFields((prevState) => {
			return { ...prevState, ...{[name]: field} };
		});
	};
	
	const handleSubmit: SubmitHandler = (callback) => {
		const submit: FormEventHandler<HTMLFormElement> = (e) => {
			e.preventDefault();
			
			const values = Object.entries(fields).reduce((prev, current) => {
				const name = current[0];
				const field = current[1];
				
				return {
					...prev,
				    ...{ [name]: field.value }
				};
			}, {});
			
			callback(values);
		};
		
		return submit;
	};
	
	return { fields, handleSubmit };
};

interface Props {
	form: Form
}

type SubmitCallback = (values: Record<Name, string>) => void;

type SubmitHandler = (callback: SubmitCallback) => FormEventHandler<HTMLFormElement>;

type Name = string;

type Form = Record<Name, Field>;

interface Field {
	type: string,
	value?: string,
	onChange?: ChangeEventHandler
}

export default useForm;