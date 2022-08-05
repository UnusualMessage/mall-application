import classNames from "classnames";
import React, {memo} from "react";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const Input = ({ label, placeholder, name, defaultValue, register }: Props) => {
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)}>{label}</label>
			<input className={classNames(labelStyles.mini, labelStyles.bold, css.input)}
				   type={"text"}
			       placeholder={placeholder}
			       defaultValue={defaultValue}
			       {...register(name)}
			/>
		</div>
	);
};

interface Props {
	label: string,
	placeholder: string,
	register: UseFormRegister<FieldValues>
	name: Path<FieldValues>,
	defaultValue: string,
}

export default memo(Input);