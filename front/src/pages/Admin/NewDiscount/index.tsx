import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {ImageInput, SelectInput, TextInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import CreateDiscount from "../../../api/interfaces/discount/CreateDiscount";
import Shop from "../../../api/interfaces/shop/Shop";
import ShopStore from "../../../stores/ShopStore";
import shopsData from "../../../data/shops";
import {getDiscountInitialOptions, getDiscountInitialValues, Values} from "../../../utils/getDiscountForm";

const rootRoute = "discounts";

const NewDiscount = () => {
	const [shops, setShops] = useState<Shop[]>([]);
	const redirect = useNavigate();
	const [form] = Form.useForm();
	
	const isLoading = InterfaceStore.isLoading();
	
	const initialValues = useMemo(() => {
		return getDiscountInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getDiscountInitialOptions();
	}, []);
	
	useEffect(() => {
		const getShops = async () => {
			const shops = await ShopStore.getAsync("");
			setShops(shops);
		};
		
		// void getShops();
	}, []);
	
	const handleCreate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		const newDiscount: CreateDiscount = {
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
			            title="Добавление статьи"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleCreate} labelCol={{span: 24}} initialValues={initialValues}>
				<TextInput {...initialOptions.title}/>
				<ImageInput {...initialOptions.image}/>
				<SelectInput values={shopsData} {...initialOptions.shop}/>
				<TextInput {...initialOptions.description}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Добавить
					</Button>
					
					<Button type="dashed" onClick={() => form.resetFields()}>
						Очистить
					</Button>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(NewDiscount);