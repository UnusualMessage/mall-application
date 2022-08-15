import React, {ChangeEventHandler} from "react";
import classNames from "classnames";
import {ConfigProvider, Empty, Select} from "antd";

import labelStyles from "/src/components/Label/label.module.scss";

const { Option } = Select;

const SelectInput = ({ values, onChange, label, defaultValue, placeholder, name }: Props) => {
	return (
		<ConfigProvider renderEmpty={() => <Empty description={"Нет данных"}/> }>
			<Select placeholder={placeholder}
			        onChange={onChange}
			        id={name}
			>
				{
					values.map(value => {
						return (
							<Option key={value.id} value={value.id}>
								{value.title}
							</Option>
						);
					})
				}
			</Select>
		</ConfigProvider>
	);
};

interface Value {
	title: string,
	id: string
}

interface Props {
	values: Value[],
	onChange?: ChangeEventHandler<HTMLSelectElement>,
	placeholder?: string
	label?: string,
	defaultValue?: string,
	name?: string
}

export default SelectInput;