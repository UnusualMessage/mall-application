import React from "react";
import { ConfigProvider, Empty, Form, FormRule, Select } from "antd";

const { Option } = Select;

const SelectInput = ({ values, label, placeholder, name, rules }: Props) => {
    return (
        <ConfigProvider
            renderEmpty={() => <Empty description={"Нет данных"} />}
        >
            <Form.Item label={label} name={name} rules={rules} hasFeedback>
                <Select placeholder={placeholder} id={name}>
                    {values.map((value) => {
                        return (
                            <Option key={value.id} value={value.id}>
                                {value.title}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </ConfigProvider>
    );
};

interface Value {
    title: string;
    id: string;
}

interface Props {
    values: Value[];
    placeholder: string;
    label: string;
    name: string;
    rules?: FormRule[];
}

export default SelectInput;
