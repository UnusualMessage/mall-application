import {Button, Card, Col, Drawer, Form, FormInstance, FormRule, Input, Row, Space} from "antd";
import React, {useEffect, useState} from "react";
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
	const image = Form.useWatch<Image | undefined>(name, form);
	const [visible, setVisible] = useState(false);
	
	const pick = (image: Image) => {
		form.setFieldValue(name, image);
		setVisible(false);
	};
	
	const open = () => {
		setVisible(true);
	};
	
	return (
		<>
			<Form.Item label={label} name={name} hasFeedback rules={rules}>
				<Space>
					<Input id={name} disabled placeholder={placeholder} value={image?.path}/>
					<Button type="primary" onClick={open}>
						Показать
					</Button>
				</Space>
			</Form.Item>
			
			<ImageDrawer visible={visible} setVisible={setVisible} pick={pick}/>
		</>
	);
};

export const ImageDrawer = ({ visible, setVisible, pick }: ImageDrawerProps) => {
	const [isFetching, setIsFetching] = useState(false);
	const images = ImageStore.get();
	
	useEffect(() => {
		const getImages = async () => {
			if (visible) {
				setIsFetching(true);
				await ImageStore.getAsync("");
				setIsFetching(false);
			}
		};
		
		void getImages();
	}, [visible]);
	
	const close = () => {
		setVisible(false);
	};
	
	return (
		<Drawer placement="right" onClose={close} visible={visible} width={"100%"}>
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
	);
};

interface Props {
	form: FormInstance,
	label: string,
	placeholder: string,
	name: string,
	rules?: FormRule[]
}

interface ImageDrawerProps {
	visible: boolean,
	setVisible: (visible: boolean) => void,
	pick: (image: Image) => void
}

export default observer(ImagePicker);