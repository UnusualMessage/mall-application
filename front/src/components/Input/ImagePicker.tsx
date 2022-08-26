import {Button, Card, Col, Drawer, Form, FormInstance, FormRule, Image, Row, Space} from "antd";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import ImageStore from "../../stores/ImageStore";
import { Image as ImageInterface } from "../../api/interfaces/image";

const cardBreakpoints = {
	xs: 12,
	sm: 12,
	md: 8,
	lg: 6,
	xl: 6,
	xxl: 4
};

const ImagePicker = ({ form, label, name, rules, multiple }: Props) => {
	const [images, setImages] = useState<ImageInterface[]>([]);
	const [visible, setVisible] = useState(false);
	
	useEffect(() => {
		if (multiple) {
			setImages(form.getFieldValue(name));
		} else {
			setImages([form.getFieldValue(name)]);
		}
	}, []);
	
	const pick = (image: ImageInterface) => {
		
		if (multiple) {
			form.setFieldValue(name, [...images.filter(item => item.id !== image.id), image]);
			setImages(prevState => [...prevState.filter(item => item.id !== image.id), image]);
		} else {
			form.setFieldValue(name, image);
			setImages([image]);
		}
		
		setVisible(false);
	};
	
	const open = () => {
		setVisible(true);
	};
	
	return (
		<>
			<Form.Item label={label} name={name} hasFeedback rules={rules}>
				<Space>
					<Button type="primary" onClick={open}>
						{
							multiple ? "Добавить изображение" : "Выбрать изображение"
						}
					</Button>
					
					<Image.PreviewGroup>
						{
							images.map(image => {
								return (
									<Image src={image.path} width={100} key={image.id}/>
								);
							})
						}
					</Image.PreviewGroup>
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
	rules?: FormRule[],
	multiple?: boolean
}

interface ImageDrawerProps {
	visible: boolean,
	setVisible: (visible: boolean) => void,
	pick: (image: ImageInterface) => void
}

export default observer(ImagePicker);