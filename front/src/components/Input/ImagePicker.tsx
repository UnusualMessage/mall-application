import {Button, Card, Col, Drawer, Form, FormInstance, FormRule, Input, Row, Space} from "antd";
import React, {useEffect, useState} from "react";

import shops from "../../data/shops";

const cardBreakpoints = {
	xs: 12,
	sm: 12,
	md: 8,
	lg: 6,
	xl: 6,
	xxl: 4
};

const ImagePicker = ({ form, label, placeholder, name, rules }: Props) => {
	const [visible, setVisible] = useState(false);
	const [image, setImage] = useState<string>();
	
	useEffect(() => {
		form.setFieldValue(name, image);
	}, [image]);
	
	
	const pick = (image: string) => {
		setImage(image);
		setVisible(false);
	};

	const showDrawer = () => {
		setVisible(true);
	};
	
	const onClose = () => {
		setVisible(false);
	};
	
	return (
		<>
			<Form.Item label={label} name={name} hasFeedback rules={rules}>
				<Space>
					<Input id={name} value={image} disabled placeholder={placeholder}/>
					<Button type="primary" onClick={showDrawer}>
						Показать
					</Button>
				</Space>
			</Form.Item>
			
			<Drawer placement="right" onClose={onClose} visible={visible} width={"100%"}>
				<Row gutter={[32, 32]} justify={"space-evenly"}>
					{
						shops.map(shop => {
							return (
								<Col {...cardBreakpoints} key={shop.id}>
									<Card hoverable
									      cover={<img alt="" src={shop.image} />}
									      onClick={() => pick(shop.image)} />
								</Col>
							);
						})
					}
				</Row>
			</Drawer>
		</>
	);
};

interface Props {
	form: FormInstance,
	label: string,
	placeholder: string,
	name: string,
	rules?: FormRule[]
}

export default ImagePicker;