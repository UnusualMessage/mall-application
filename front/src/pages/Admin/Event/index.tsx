import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Form, message, PageHeader, Space} from "antd";

import {SelectInput, TextInput, ImagePicker, RichTextInput} from "../../../components/Form/inputs";
import Loader from "../../../components/Loader";
import {Update} from "../../../components/Form/buttons";

import ShopStore from "../../../stores/ShopStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import EventStore from "../../../stores/EventStore";
import { UpdateEvent } from "../../../api/interfaces/event";
import transliterate from "../../../utils/transliterate";
import {getEventInitialOptions, getEventInitialValues, Values} from "../../../utils/forms/getEventForm";
import {showMessage} from "../../../utils/showMessage";

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
	}, [id]);
	
	if (!event || isFetching) {
		return <Loader/>;
	}
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		await EventStore.deleteAsync(id ?? "");
		InterfaceStore.setLoading(false);
		
		const successful = EventStore.isRequestSuccessful();
		
		await showMessage(successful,
			"Статья удалена!",
			EventStore.getErrorMessage());
		
		if (successful) {
			redirect(`../${rootRoute}`);
		}
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
		await EventStore.updateAsync(newEvent);
		InterfaceStore.setLoading(false);
		
		await showMessage(EventStore.isRequestSuccessful(),
			"Статья обновлена!",
			EventStore.getErrorMessage());
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
				<Update isLoading={interfaceLocked} handleDelete={handleDelete}/>
			</Form>
		</Space>
	);
};

export default observer(Event);