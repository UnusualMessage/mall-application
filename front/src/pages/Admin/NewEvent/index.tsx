import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {ImageInput, SelectInput, TextInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import Shop from "../../../api/interfaces/shop/Shop";
import ShopStore from "../../../stores/ShopStore";
import CreateEvent from "../../../api/interfaces/event/CreateEvent";
import shopsData from "../../../data/shops";
import {getEventInitialOptions, getEventInitialValues, Values} from "../../../utils/getEventForm";

const rootRoute = "events";

const NewEvent = () => {
	const [shops, setShops] = useState<Shop[]>([]);
	const redirect = useNavigate();
	const isLoading = InterfaceStore.isLoading();
	const [form] = Form.useForm();
	
	const initialValues = useMemo(() => {
		return getEventInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getEventInitialOptions();
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
		
		const newEvent: CreateEvent = {
			title: values.title,
			description: values.description,
			image: values.image[0].originFileObj as File,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		// await EventStore.createAsync(newEvent);
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

export default observer(NewEvent);