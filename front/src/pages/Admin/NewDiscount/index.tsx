import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {SelectInput, TextInput, RichTextInput, ImagePicker} from "../../../components/Input";
import Loader from "../../../components/Loader";

import InterfaceStore from "../../../stores/InterfaceStore";
import DiscountStore from "../../../stores/DiscountStore";
import ShopStore from "../../../stores/ShopStore";
import { CreateDiscount } from "../../../api/interfaces/discount";
import {getDiscountInitialOptions, getDiscountInitialValues, Values} from "../../../utils/getDiscountForm";
import transliterate from "../../../utils/transliterate";

const rootRoute = "discounts";

const NewDiscount = () => {
	const redirect = useNavigate();
	const [form] = Form.useForm();
	const [isFetching, setIsFetching] = useState(true);
	
	const shops = ShopStore.get();
	
	const interfaceLocked = InterfaceStore.isLoading();
	
	const initialValues = useMemo(() => {
		return getDiscountInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getDiscountInitialOptions();
	}, []);
	
	useEffect(() => {
		const getShops = async () => {
			await ShopStore.getAsync("");
			setIsFetching(false);
		};
		
		void getShops();
	}, []);
	
	if (isFetching) {
		return <Loader/>;
	}
	
	const handleCreate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const newDiscount: CreateDiscount = {
			title: values.title,
			description: values.description,
			imageId: values.image.id,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}`,
			shopId: values.shopId
		};
		
		InterfaceStore.setLoading(true);
		await DiscountStore.createAsync(newDiscount);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Добавление статьи"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleCreate} labelCol={{span: 24}} initialValues={initialValues} form={form}>
				<TextInput {...initialOptions.title}/>
				<ImagePicker {...initialOptions.image} form={form}/>
				<SelectInput values={shops} {...initialOptions.shopId}/>
				<RichTextInput form={form} {...initialOptions.description} empty/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={interfaceLocked} disabled={interfaceLocked}>
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