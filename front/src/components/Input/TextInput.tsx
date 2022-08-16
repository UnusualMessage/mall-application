import React, {memo} from "react";
import {Form, Input} from "antd";
import {FormRule} from "antd";

const TextInput = ({ label, placeholder, name, rules, password }: Props) => {
	return (
		<Form.Item label={label} name={name} rules={rules} hasFeedback>
			{
				password
					? <Input.Password id={name} placeholder={placeholder} />
					: <Input id={name} placeholder={placeholder} />
			}
		</Form.Item>
	);
};

interface Props {
	label: string,
	placeholder: string,
	name: string,
	rules?: FormRule[]
	password?: boolean
}

export default memo(TextInput);