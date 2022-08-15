import {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, Input, Space, Typography} from "antd";

import {ImageInput, SelectInput} from "../../../components/Input";

import{Values} from "../../../hooks/useForm";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import CreateShop from "../../../api/interfaces/shop/CreateShop";
import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";
import Category from "../../../api/interfaces/category/Category";
import discounts from "../../../data/discounts";

const NewShop: FC = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	const [categories, setCategories] = useState<Category[]>([]);
	
	const isLoading = InterfaceStore.isLoading();
	
	const [form] = Form.useForm();
	
	useEffect(() => {
		const getCategories = async () => {
			const categories = await CategoryStore.getAsync("");
			setCategories(categories);
		};
		
		void getCategories();
	}, []);
	
	const handleCreate = async (values: Values) => {
		if (!imagePreview) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newShop: CreateShop = {
			title: values.title,
			description: values.description,
			floor: Number(values.floor),
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryIds: [values.category],
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/shops/${transliteratedTitle}`
		};
		
		InterfaceStore.setLoading(true);
		await ShopStore.createAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<Typography.Title level={2}>
				Добавление магазина
			</Typography.Title>
			
			<Form form={form} onFinish={handleCreate} style={{width: "100%"}} labelCol={{span: 2}}>
				<Form.Item label="Название" name="title"
				           rules={[{ required: true, message: "Необходимо ввести название магазина" }]}>
					<Input />
				</Form.Item>
				
				<Form.Item label="Этаж" name="floor"
				           rules={[{ required: true, message: "Необходимо ввести этаж" }]}>
					<Input />
				</Form.Item>
				
				<Form.Item label="Время" name="schedule"
				           rules={[{ required: true, message: "Необходимо ввести график работы" }]}>
					<Input />
				</Form.Item>
				
				<Form.Item label="Телефон" name="phone"
				           rules={[{ required: true, message: "Необходимо ввести номер телефона" }]}>
					<Input />
				</Form.Item>
				
				<Form.Item label="Сайт" name="site"
				           rules={[{ required: true, message: "Необходимо ввести адрес сайта" }]}>
					<Input />
				</Form.Item>
				
				<Form.Item label="Изображение" name="image"
				           rules={[{ required: true, message: "Необходимо выбрать изображение" }]}>
					<ImageInput/>
				</Form.Item>
				
				<Form.Item label="Категория" name="category"
				           rules={[{ required: true, message: "Необходимо выбрать категорию" }]}>
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

export default observer(NewShop);