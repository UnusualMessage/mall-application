import {Form, FormInstance, FormRule} from "antd";
import React, {memo} from "react";
import {Descendant} from "slate";

import TextEditor from "../TextEditor/TextEditor";

const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [
			{
				text: ""
			}
		],
	},
];

const RichTextInput = ({ label, name, rules, placeholder, form, empty }: Props) => {
	const text = Form.useWatch<string | undefined>(name, form);
	
	const onChange = (value: Descendant[]) => {
		const stringify = JSON.stringify(value);
		form.setFieldValue(name, stringify);
	};
	
	const initialText = empty ? JSON.stringify(initialValue) : text;

	return (
		<Form.Item label={label} name={name} rules={rules} hasFeedback>
			<TextEditor placeholder={placeholder} onChange={onChange}
			            text={initialText}/>
		</Form.Item>
	);
};

interface Props {
	form: FormInstance,
	label: string,
	name: string,
	rules?: FormRule[],
	placeholder: string,
	empty?: boolean
}

export default memo(RichTextInput);