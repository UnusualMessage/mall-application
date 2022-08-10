import classNames from "classnames";
import React, {ChangeEventHandler, memo} from "react";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const TextInput = ({ label, placeholder, name, defaultValue, onChange }: Props) => {
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)} htmlFor={name}>
				{label}
			</label>
			
			<input className={classNames(labelStyles.mini, labelStyles.bold, css.input)}
			       id={name}
			       name={name}
			       type={"text"}
			       placeholder={placeholder}
			       defaultValue={defaultValue ? defaultValue : ""}
			       onChange={onChange}
			/>
		</div>
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