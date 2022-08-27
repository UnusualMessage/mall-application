import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {SelectInput, TextInput, RichTextInput, ImagePicker} from "../../../components/Form/inputs";
import Loader from "../../../components/Loader";

import InterfaceStore from "../../../stores/InterfaceStore";
import DiscountStore from "../../../stores/DiscountStore";
import ShopStore from "../../../stores/ShopStore";
import { CreateDiscount } from "../../../api/interfaces/discount";
import {getDiscountInitialOptions, getDiscountInitialValues, Values} from "../../../utils/forms/getDiscountForm";
import transliterate from "../../../utils/transliterate";
import {showMessage} from "../../../utils/showMessage";
import {Create} from "../../../components/Form/buttons";

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
		
		await showMessage(DiscountStore.isRequestSuccessful(),
			"Статья добавлена!",
			DiscountStore.getErrorMessage());
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
				<Create isLoading={interfaceLocked} form={form}/>
			</Form>
		</Space>
	);
};

export default observer(NewDiscount);