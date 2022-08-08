import React, {ChangeEventHandler} from "react";
import classNames from "classnames";

import css from "./select.module.scss";
import labelStyles from "/src/components/Label/label.module.scss";

const Select = ({ values, onChange, label }: Props) => {
	return (
	<div className={classNames(css.wrapper)}>
		<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)}>
			{label}
		</label>
		
		<select className={classNames(css.select, labelStyles.mini, label.bold)} onChange={onChange}>
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
	label: string
}

export default Select;