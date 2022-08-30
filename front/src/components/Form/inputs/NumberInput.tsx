import React, {memo} from "react";
import {Form, InputNumber} from "antd";
import {FormRule} from "antd";

const NumberInput = ({ label, placeholder, name, rules, min, max }: Props) => {
	return (
		<Form.Item label={label} name={name} rules={rules}>
			<InputNumber id={name} placeholder={placeholder} min={min} max={max}/>
		</Form.Item>
	);
};

interface Props {
	label: string,
	placeholder: string,
	name: string,
	rules?: FormRule[],
	min: number,
	max: number
}

export default memo(NumberInput);