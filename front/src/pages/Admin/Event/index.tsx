import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, message, PageHeader, Popconfirm, Space} from "antd";

import {SelectInput, TextInput, ImagePicker, RichTextInput} from "../../../components/Input";
import Loader from "../../../components/Loader";

import ShopStore from "../../../stores/ShopStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import EventStore from "../../../stores/EventStore";
import { UpdateEvent } from "../../../api/interfaces/event";
import transliterate from "../../../utils/transliterate";
import {getEventInitialOptions, getEventInitialValues, Values} from "../../../utils/forms/getEventForm";

const rootRoute = "events";

const Event = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [isFetching, setIsFetching] = useState(true);
	const [form] = Form.useForm();
	
	const interfaceLocked = InterfaceStore.isLoading();
	
	const event = EventStore.getCurrent();
	const shops = ShopStore.get();
	
	const initialValues = useMemo(() => {
		return getEventInitialValues(event);
	}, [event]);
	
	const initialOptions = useMemo(() => {
		return getEventInitialOptions();
	}, [event]);
	
	useEffect(() => {
		const getEvent = async () => {
			await EventStore.getByIdAsync(id ?? "");
			
			if (!EventStore.isRequestSuccessful()) {
				message.error(EventStore.getErrorMessage());
				redirect(`../${rootRoute}`);
			}
			
			setIsFetching(false);
		};
		
		void getEvent();
	}, [event]);
	
	if (!event || isFetching) {
		return <Loader/>;
	}
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		await EventStore.deleteAsync(id ?? "");
		InterfaceStore.setLoading(false);
	};
	
	const handleUpdate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const newEvent: UpdateEvent = {
			id: event.id,
			title: values.title,
			description: values.description,
			imageId: values.image.id,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}/${event.id}`,
			shopId: values.shopId
		};
		
		InterfaceStore.setLoading(true);
		await EventStore.createAsync(newEvent);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Редактирование статьи"
			            subTitle={event.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues} form={form}>
				<TextInput {...initialOptions.title}/>
				<ImagePicker {...initialOptions.image} form={form}/>
				<SelectInput values={shops} {...initialOptions.shopId}/>
				<RichTextInput form={form} {...initialOptions.description}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={interfaceLocked} disabled={interfaceLocked}>
						Изменить
					</Button>
					
					<Popconfirm title={"Удалить?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={interfaceLocked} disabled={interfaceLocked}>
							Удалить
						</Button>
					</Popconfirm>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Event);