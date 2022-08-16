import {FC, useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {ImageInput, SelectInput, TextInput, NumberInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import CreateShop from "../../../api/interfaces/shop/CreateShop";
import CategoryStore from "../../../stores/CategoryStore";
import Category from "../../../api/interfaces/category/Category";
import {getShopInitialOptions, getShopInitialValues, Values} from "../../../utils/getShopForm";
import categoriesData from "../../../data/categories";

const rootRoute = "shops";

const NewShop: FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const redirect = useNavigate();
	const [form] = Form.useForm();
	
	const isLoading = InterfaceStore.isLoading();
	
	const initialValues = useMemo(() => {
		return getShopInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getShopInitialOptions();
	}, []);
	
	useEffect(() => {
		const getCategories = async () => {
			const categories = await CategoryStore.getAsync("");
			setCategories(categories);
		};
		
		setCategories(categoriesData);
		// void getCategories();
	}, []);
	
	const handleCreate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const newShop: CreateShop = {
			title: values.title,
			description: values.description,
			floor: Number(values.floor),
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryIds: [values.category],
			image: values.image[0].originFileObj as File,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}`
		};
		
		InterfaceStore.setLoading(true);
		// await ShopStore.createAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Добавление магазина"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form form={form} onFinish={handleCreate} labelCol={{span: 24}} initialValues={initialValues}>
				<TextInput {...initialOptions.title}/>
				<NumberInput {...initialOptions.floor} min={1} max={2}/>
				<TextInput {...initialOptions.schedule}/>
				<TextInput {...initialOptions.phone}/>
				<TextInput {...initialOptions.site}/>
				<ImageInput {...initialOptions.image}/>
				<SelectInput values={categories} {...initialOptions.category}/>
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

export default observer(NewShop);