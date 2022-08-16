import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Button, Form, PageHeader, Popconfirm, Space} from "antd";

import {SelectInput, TextInput, ImagePicker} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import EventInterface from "../../../api/interfaces/event/Event";
import discounts from "../../../data/discounts";
import Shop from "../../../api/interfaces/shop/Shop";
import ShopStore from "../../../stores/ShopStore";
import shopsData from "../../../data/shops";
import {getEventInitialOptions, getEventInitialValues, Values} from "../../../utils/getEventForm";
import EventStore from "../../../stores/EventStore";
import UpdateEvent from "../../../api/interfaces/event/UpdateEvent";

const rootRoute = "events";

const Event = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const isLoading = InterfaceStore.isLoading();
	const [form] = Form.useForm();
	
	const [event, setEvent] = useState<EventInterface>();
	const [shops, setShops] = useState<Shop[]>([]);
	
	const initialValues = useMemo(() => {
		return getEventInitialValues(event);
	}, [event]);
	
	const initialOptions = useMemo(() => {
		return getEventInitialOptions();
	}, [event]);
	
	useEffect(() => {
		const getEvent = async () => {
			const events = await EventStore.getAsync(`Filters=Id==${id}`);
			const shops = await ShopStore.getAsync("");
			
			if (events.length !== 0) {
				setShops(shops);
				setEvent(events[0]);
			} else {
				redirect(`../${rootRoute}`);
			}
		};
		
		setEvent(discounts.find(item => item.id === id));
		// void getDiscount();
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		// await EventStore.deleteAsync({ id: event.id });
		InterfaceStore.setLoading(false);
	};
	
	const handleUpdate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const newEvent: UpdateEvent = {
			id: event.id,
			title: values.title,
			description: values.description,
			image: values.image,
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
			            title="Редактирование статьи"
			            subTitle={event.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues} form={form}>
				<TextInput {...initialOptions.title}/>
				<ImagePicker {...initialOptions.image} form={form}/>
				<SelectInput values={shopsData} {...initialOptions.shop}/>
				<TextInput {...initialOptions.description}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Изменить
					</Button>
					
					<Popconfirm title={"Удалить?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={isLoading} disabled={isLoading}>
							Удалить
						</Button>
					</Popconfirm>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Event);