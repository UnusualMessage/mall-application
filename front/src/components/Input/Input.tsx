import classNames from "classnames";
import React, {ChangeEventHandler, memo} from "react";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const Input = ({ type, label, placeholder, name, defaultValue, onChange }: Props) => {
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)} htmlFor={name}>
				{label}
			</label>
			
			<input className={classNames(labelStyles.mini, labelStyles.bold, css.input)}
			       id={name}
				   type={type}
			       placeholder={placeholder}
			       defaultValue={defaultValue}
			       onChange={onChange}
			/>
		</div>
	);
};

interface Props {
	type: string,
	label: string,
	placeholder: string,
	defaultValue: string,
	name: string
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export default memo(Input);