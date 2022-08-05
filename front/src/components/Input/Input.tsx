import classNames from "classnames";
import React, {ChangeEventHandler, memo} from "react";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const Input = ({ type, label, placeholder, name, defaultValue, register, onChange }: Props) => {
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
			       
			       {...register(name)}
			       onChange={onChange}
			/>
		</div>
	);
};

interface Props {
	type: string,
	label: string,
	placeholder: string,
	register: UseFormRegister<FieldValues>
	name: Path<FieldValues>,
	defaultValue: string,
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export default memo(Input);