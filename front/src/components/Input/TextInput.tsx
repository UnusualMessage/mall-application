import React, {ChangeEventHandler, memo} from "react";

import {Input, Space, Typography} from "antd";

const TextInput = ({ label, placeholder, name, defaultValue, onChange }: Props) => {
	return (
		<Input id={name}
		       name={name}
		       type={"text"}
		       placeholder={placeholder}
		       defaultValue={defaultValue ? defaultValue : ""}
		       onChange={onChange}
		/>
	);
};

interface Props {
	label: string,
	placeholder: string,
	defaultValue?: string,
	name: string
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export default memo(TextInput);