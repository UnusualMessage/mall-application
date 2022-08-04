import classNames from "classnames";
import React, {ChangeEventHandler, memo} from "react";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const Input = ({ label, placeholder, value, onChange }: Props) => {
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)}>{label}</label>
			<input className={classNames(labelStyles.mini, labelStyles.bold, css.input)}
				   type={"text"}
			       placeholder={placeholder}
			       value={value}
			       onChange={onChange}
			/>
		</div>
	);
};

interface Props {
	label: string,
	placeholder: string,
	value: string,
	onChange: ChangeEventHandler<HTMLInputElement>
}

export default memo(Input);