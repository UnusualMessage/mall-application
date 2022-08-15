import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import {ImageInput, SelectInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import EventStore from "../../../stores/EventStore";
import shops from "../../../data/shops";
import UpdateEvent from "../../../api/interfaces/event/UpdateEvent";
import EventInterface from "../../../api/interfaces/event/Event";
import {Button, Form, Input, PageHeader, Space} from "antd";
import events from "../../../data/events";

const Event = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const isLoading = InterfaceStore.isLoading();
	
	const [event, setEvent] = useState<EventInterface>();
	const [form] = Form.useForm();
	
	useEffect(() => {
		const getEvent = async () => {
			const events = await EventStore.getAsync(`Filters=Id==${id}`);
			
			if (events.length !== 0) {
				setEvent(events[0]);
			} else {
				redirect("../events");
			}
		};
		
		setEvent(events.find(item => item.id === id));
		// void getEvent();
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	const initialValues = {
		title: event.title,
		description: event.description,
		shop: event.shop.id
	};
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		await EventStore.deleteAsync({ id: event.id });
		InterfaceStore.setLoading(false);
		
		if (EventStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleUpdate = async (values: any) => {
		const imagePreview = values.image as File;
		
		const transliteratedTitle = transliterate(values.title);
		const newEvent: UpdateEvent = {
			id: event.id,
			title: values.title,
			description: values.description,
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/events/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await EventStore.updateAsync(newEvent);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect("../events")}
			            title="Редактирование статьи"
			            subTitle={event.title}
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

export default observer(Event);