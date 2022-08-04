import classNames from "classnames";
import React from "react";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const Input = ({ label, placeholder, value }: Props) => {
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)}>{label}</label>
			<input className={classNames(labelStyles.mini, labelStyles.bold, css.input)}
				   type={"text"}
			       placeholder={placeholder}
			       value={value}
			/>
		</div>
	);
};

interface Props {
	label: string,
	value: string,
	placeholder: string,
}

export default Input;