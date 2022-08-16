import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Popconfirm, Space} from "antd";

import {ImageInput, SelectInput, TextInput} from "../../../components/Input";

import DiscountStore from "../../../stores/DiscountStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";
import DiscountInterface from "../../../api/interfaces/discount/Discount";
import discounts from "../../../data/discounts";
import {getDiscountInitialOptions, getDiscountInitialValues, Values} from "../../../utils/getDiscountForm";
import Shop from "../../../api/interfaces/shop/Shop";
import ShopStore from "../../../stores/ShopStore";
import shopsData from "../../../data/shops";

const rootRoute = "discounts";

const Discount = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const isLoading = InterfaceStore.isLoading();
	
	const [discount, setDiscount] = useState<DiscountInterface>();
	const [shops, setShops] = useState<Shop[]>([]);
	
	const initialValues = useMemo(() => {
		return getDiscountInitialValues(discount);
	}, [discount]);
	
	const initialOptions = useMemo(() => {
		return getDiscountInitialOptions();
	}, [discount]);
	
	useEffect(() => {
		const getDiscount = async () => {
			const discounts = await DiscountStore.getAsync(`Filters=Id==${id}`);
			const shops = await ShopStore.getAsync("");
			
			if (discounts.length !== 0) {
				setShops(shops);
				setDiscount(discounts[0]);
			} else {
				redirect(`../${rootRoute}`);
			}
		};
		
		setDiscount(discounts.find(item => item.id === id));
		// void getDiscount();
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		// await DiscountStore.deleteAsync({ id: discount.id });
		InterfaceStore.setLoading(false);
	};
	
	const handleUpdate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const newDiscount: UpdateDiscount = {
			id: discount.id,
			title: values.title,
			description: values.description,
			image: values.image[0].originFileObj as File,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		// await DiscountStore.createAsync(newDiscount);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Редактирование статьи"
			            subTitle={discount.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues}>
				<TextInput {...initialOptions.title}/>
				<ImageInput {...initialOptions.image}/>
				<SelectInput values={shopsData} {...initialOptions.shop}/>
				<TextInput {...initialOptions.description}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Добавить
					</Button>
					
					<Popconfirm title={"Удалить статью?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={isLoading} disabled={isLoading}>
							Удалить
						</Button>
					</Popconfirm>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Discount);