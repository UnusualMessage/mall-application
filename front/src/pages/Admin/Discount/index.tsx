import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Button, Form, Input, PageHeader, Space, Typography} from "antd";

import {ImageInput, SelectInput} from "../../../components/Input";

import DiscountStore from "../../../stores/DiscountStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import shops from "../../../data/shops";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";
import DiscountInterface from "../../../api/interfaces/discount/Discount";
import discounts from "../../../data/discounts";

const Discount = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [discount, setDiscount] = useState<DiscountInterface>();
	
	const isLoading = InterfaceStore.isLoading();
	
	const [form] = Form.useForm();
	
	useEffect(() => {
		const getDiscount = async () => {
			const discounts = await DiscountStore.getAsync(`Filters=Id==${id}`);
			
			if (discounts.length !== 0) {
				setDiscount(discounts[0]);
			} else {
				redirect("../discounts");
			}
		};
		
		setDiscount(discounts.find(item => item.id === id));
		// void getDiscount();
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	const initialValues = {
		title: discount.title,
		description: discount.description,
		shop: discount.shop.id
	};
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		await DiscountStore.deleteAsync({ id: discount.id });
		InterfaceStore.setLoading(false);
		
		if (DiscountStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleUpdate = async (values: any) => {
		const imagePreview = values.image as File;
		
		const transliteratedTitle = transliterate(values.title);
		const newDiscount: UpdateDiscount = {
			id: discount.id,
			title: values.title,
			description: values.description,
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/discounts/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await DiscountStore.createAsync(newDiscount);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect("../discounts")}
			            title="Редактирование статьи"
			            subTitle={discount.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form form={form} onFinish={handleUpdate} style={{width: "100%"}} initialValues={initialValues}>
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
					<SelectInput values={shops}/>
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

export default observer(Discount);