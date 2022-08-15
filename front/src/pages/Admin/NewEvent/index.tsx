import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Button, Form, Input, Space, Typography} from "antd";

import {ImageInput, SelectInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import Shop from "../../../api/interfaces/shop/Shop";
import ShopStore from "../../../stores/ShopStore";
import discounts from "../../../data/discounts";
import CreateEvent from "../../../api/interfaces/event/CreateEvent";
import EventStore from "../../../stores/EventStore";

const NewEvent = () => {
	const [shops, setShops] = useState<Shop[]>([]);
	
	const isLoading = InterfaceStore.isLoading();
	
	useEffect(() => {
		const getShops = async () => {
			const shops = await ShopStore.getAsync("");
			setShops(shops);
		};
		
		void getShops();
	}, []);
	
	const [form] = Form.useForm();
	
	const handleCreate = async (values: any) => {
		console.log(values);
		
		const imagePreview = values.image as File;
		
		const transliteratedTitle = transliterate(values.title);
		const newEvent: CreateEvent = {
			title: values.title,
			description: values.description,
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/discounts/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await EventStore.createAsync(newEvent);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<Typography.Title level={2}>
				Добавление новости
			</Typography.Title>
			
			<Form form={form} onFinish={handleCreate} style={{width: "100%"}}>
				<Form.Item label="Заголовок" name="title"
				           rules={[{ required: true, message: "Необходимо ввести заголовок статьи" }]}>
					<Input />
				</Form.Item>
				
				<Form.Item label="Изображение" name="image"
				           rules={[{ required: true, message: "Необходимо выбрать изображение" }]}>
					<ImageInput/>
				</Form.Item>
				
				<Form.Item label="Магазин" name="shop"
				           rules={[{ required: true, message: "Необходимо выбрать магазин" }]}>
					<SelectInput values={discounts}/>
				</Form.Item>
				
				<Form.Item label="Описание" name="description">
					<Input />
				</Form.Item>
				
				<Space>
					<Form.Item label=" " colon={false}>
						<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
							Добавить
						</Button>
					</Form.Item>
					
					<Form.Item label=" " colon={false}>
						<Button type="dashed" onClick={() => form.resetFields()}>
							Очистить
						</Button>
					</Form.Item>
				</Space>
			
			</Form>
		</Space>
	);
};

export default observer(NewEvent);