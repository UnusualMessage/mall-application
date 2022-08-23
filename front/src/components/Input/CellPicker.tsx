import {Button, Drawer, Form, FormInstance, FormRule, Input, Space} from "antd";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import Schema from "../Schema";

import MapStore from "../../stores/MapStore";

const CellPicker = ({ form, label, placeholder, name, rules }: Props) => {
	const cell = Form.useWatch<string | undefined>(name, form);
	const [visible, setVisible] = useState(false);
	
	const picked = MapStore.getClicked();
	
	const open = () => {
		setVisible(true);
	};
	
	useEffect(() => {
		setVisible(false);
		form.setFieldValue(name, picked?.id);
	}, [picked]);
	
	return (
		<>
			<Form.Item label={label} name={name} hasFeedback rules={rules}>
				<Space>
					<Input id={name} disabled placeholder={placeholder} value={cell}/>
					<Button type="primary" onClick={open}>
						Показать
					</Button>
				</Space>
			</Form.Item>
			
			<SchemaDrawer visible={visible}/>
		</>
	);
};

export const SchemaDrawer = ({ visible }: SchemaDrawerProps) => {
	return (
		<Drawer placement="right" visible={visible} width={"100%"}>
			<Schema readonly/>
		</Drawer>
	);
};

interface Props {
	form: FormInstance,
	label: string,
	placeholder: string,
	name: string,
	rules?: FormRule[]
}

interface SchemaDrawerProps {
	visible: boolean,
}

export default observer(CellPicker);