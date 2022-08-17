import {Button, Card, Col, Drawer, Form, FormInstance, FormRule, Input, Row, Space} from "antd";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";

import ImageStore from "../../stores/ImageStore";
import Image from "../../api/interfaces/image/Image";

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
	const image = Form.useWatch<Image | undefined>(name, form);
	const [isFetching, setIsFetching] = useState(false);
	
	const images = ImageStore.get();
	
	const pick = (image: Image) => {
		form.setFieldValue(name, image);
		setVisible(false);
	};
	
	const showDrawer = async () => {
		setIsFetching(true);
		await ImageStore.getAsync("");
		setIsFetching(false);
		setVisible(true);
	};
	
	const onClose = () => {
		setVisible(false);
	};
	
	return (
		<>
			<Form.Item label={label} name={name} hasFeedback rules={rules}>
				<Space>
					<Input id={name} disabled placeholder={placeholder} value={image?.path}/>
					<Button type="primary" onClick={showDrawer}>
						Показать
					</Button>
				</Space>
			</Form.Item>
			
			<Drawer placement="right" onClose={onClose} visible={visible} width={"100%"}>
				<Row gutter={[32, 32]} justify={"space-evenly"}>
					{
						isFetching
							?
							<></>
							:
							images.map(image => {
								return (
									<Col {...cardBreakpoints} key={image.id}>
										<Card hoverable
										      cover={<img alt="" src={image.path} />}
										      onClick={() => pick(image)} />
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

export default observer(ImagePicker);