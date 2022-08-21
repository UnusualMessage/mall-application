import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {ImagePicker, SelectInput, TextInput, RichTextInput} from "../../../components/Input";
import Loader from "../../../components/Loader";

import InterfaceStore from "../../../stores/InterfaceStore";
import ShopStore from "../../../stores/ShopStore";
import EventStore from "../../../stores/EventStore";
import { CreateEvent } from "../../../api/interfaces/event";
import transliterate from "../../../utils/transliterate";
import {getEventInitialOptions, getEventInitialValues, Values} from "../../../utils/forms/getEventForm";

const rootRoute = "events";

const NewEvent = () => {
	const redirect = useNavigate();
	const [form] = Form.useForm();
	const [isFetching, setIsFetching] = useState(true);
	const interfaceLocked = InterfaceStore.isLoading();
	
	const shops = ShopStore.get();
	
	const initialValues = useMemo(() => {
		return getEventInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getEventInitialOptions();
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
		
		const newEvent: CreateEvent = {
			title: values.title,
			description: values.description,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}`,
			imageId: values.image.id,
			shopId: values.shopId
		};
		
		InterfaceStore.setLoading(true);
		await EventStore.createAsync(newEvent);
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

export default observer(NewEvent);