import React, {ChangeEventHandler} from "react";
import classNames from "classnames";

import css from "./input.module.scss";
import labelStyles from "/src/components/Label/label.module.scss";

const SelectInput = ({ values, onChange, label, defaultValue, placeholder, name }: Props) => {
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)}>
				{label}
			</label>
			
			<select className={classNames(css.input, labelStyles.mini, label.bold)}
			        placeholder={placeholder}
			        onChange={onChange}
			        defaultValue={defaultValue ? defaultValue : values[0].id}
			        name={name}
			        id={name}
			>
				{
					values.map(value => {
						return (
							<option className={classNames(labelStyles.mini, label.bold)} key={value.id} value={value.id}>
								{value.title}
							</option>
						);
					})
				}
			</select>
		</div>
	);
};

interface Value {
	title: string,
	id: string
}

interface Props {
	values: Value[],
	onChange?: ChangeEventHandler<HTMLSelectElement>,
	placeholder: string
	label: string,
	defaultValue?: string,
	name: string
}

export default SelectInput;