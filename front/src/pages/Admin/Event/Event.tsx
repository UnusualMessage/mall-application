import {useNavigate, useParams} from "react-router-dom";
import {MouseEventHandler, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import Image from "../../../components/Image";
import {ImageInput, SelectInput, TextInput} from "../../../components/Input";
import LoadingOverlay from "../../../components/LoadingOverlay";

import events from "../../../data/events";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import EventStore from "../../../stores/EventStore";
import useForm, {Values} from "../../../hooks/useForm";
import getEventForm from "../../../utils/getEventForm";
import shops from "../../../data/shops";
import UpdateEvent from "../../../api/interfaces/event/UpdateEvent";

const Event = () => {
	const [imagePreview, setImagePreview] = useState<File>();
	
	const { id } = useParams();
	const redirect = useNavigate();
	
	const isLoading = InterfaceStore.isLoading();
	
	const event = events.find(event => event.link === id);
	
	const form = useMemo(() => {
		return getEventForm(event);
	}, [event]);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, description, shop } = inputs;
	
	useEffect(() => {
		if (!event) {
			redirect("");
		}
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	const handleDelete: MouseEventHandler = async () => {
		InterfaceStore.setLoading(true);
		await EventStore.deleteAsync({ id: event.id });
		InterfaceStore.setLoading(false);
		
		if (EventStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleUpdate = async (values: Values) => {
		if (imagePreview === undefined) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newEvent: UpdateEvent = {
			id: event.id,
			title: values.title,
			description: values.description,
			image: imagePreview,
			link: transliteratedTitle,
			route: `/events/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await EventStore.createAsync(newEvent);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(handleUpdate)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : event.image}/>
			
			<div className={css.info}>
				<ImageInput {...form.image.options} setImage={setImagePreview}/>
				<TextInput {...form.title.options} defaultValue={event.title} onChange={title.onChange} />
				<SelectInput {...form.shop.options} defaultValue={event.shop.id} onChange={shop.onChange} values={shops}/>
				<TextInput {...form.description.options} defaultValue={event.description} onChange={description.onChange} />
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Изменить"} disabled={isLoading} submit/>
				<Button text={"Удалить"} disabled={isLoading} onClick={handleDelete}/>
			</div>
		</form>
	);
};

export default observer(Event);