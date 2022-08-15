import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, Input, PageHeader, Space, Typography} from "antd";

import {ImageInput, SelectInput} from "../../../components/Input";

import ShopInterface from "../../../api/interfaces/shop/Shop";
import InterfaceStore from "../../../stores/InterfaceStore";
import ShopStore from "../../../stores/ShopStore";
import transliterate from "../../../utils/transliterate";
import UpdateShop from "../../../api/interfaces/shop/UpdateShop";
import Category from "../../../api/interfaces/category/Category";
import CategoryStore from "../../../stores/CategoryStore";
import shops from "../../../data/shops";
import categoriesData from "../../../data/categories";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [shop, setShop] = useState<ShopInterface>();
	const [categories, setCategories] = useState<Category[]>([]);
	
	const isLoading = InterfaceStore.isLoading();
	
	const [form] = Form.useForm();
	
	useEffect(() => {
		const getShop = async () => {
			const shops = await ShopStore.getAsync(`Filters=Id==${id}`);
			const categories = await CategoryStore.getAsync("");
			
			if (shops.length !== 0) {
				setShop(shops[0]);
				setCategories(categories);
			} else {
				redirect("../");
			}
		};
		
		setShop(shops.find(item => item.id === id));
		setCategories(categoriesData);
		// void getShop();
	}, [id]);
	
	if (!shop) {
		return null;
	}
	
	const handleUpdate = async (values: any) => {
		const transliteratedTitle = transliterate(values.title);
		const imagePreview = values.image as File;
		
		const newShop: UpdateShop = {
			id: shop.id,
			title: values.title,
			description: values.description,
			floor: values.floor,
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categories: [values.categories],
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/shops/${transliteratedTitle}`
		};
		
		InterfaceStore.setLoading(true);
		await ShopStore.updateAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		await ShopStore.deleteAsync({ id: shop.id });
		InterfaceStore.setLoading(false);
		
		if (ShopStore.isRequestSuccessful()) {
			redirect("../shops");
		}
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect("../shops")}
			            title="Редактирование статьи"
			            subTitle={shop.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form form={form} onFinish={handleUpdate} style={{width: "100%"}} labelCol={{span: 2}}>
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
					<SelectInput values={categories} defaultValue={shop.categories[1].id as unknown as ChangeEvent<HTMLSelectElement>}/>
				</Form.Item>
				
				<Form.Item label="Описание" name="description">
					<Input />
				</Form.Item>
				
				<Space>
					<Form.Item label=" " colon={false}>
						<Button type="primary" htmlType="submit"
						        loading={isLoading} disabled={isLoading}>
							Добавить
						</Button>
					</Form.Item>
					
					<Form.Item label=" " colon={false}>
						<Button type="primary" onClick={() => handleDelete()}
						        danger loading={isLoading} disabled={isLoading}>
							Удалить
						</Button>
					</Form.Item>
				</Space>
			
			</Form>
		</Space>
	);
};

export default observer(Shop);