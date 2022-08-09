import {useNavigate, useParams} from "react-router-dom";
import {ChangeEventHandler, MouseEventHandler, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import Image from "../../../components/Image";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import LoadingOverlay from "../../../components/LoadingOverlay";

import events from "../../../data/events";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import EventStore from "../../../stores/EventStore";
import shops from "../../../data/shops";
import useForm, {Values} from "../../../hooks/useForm";
import CreateEvent from "../../../api/interfaces/event/CreateEvent";
import getEventForm from "../../../utils/getEventForm";

const Event = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	
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
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		InterfaceStore.setLoading(true);
		await EventStore.deleteAsync({ id: event.id });
		InterfaceStore.setLoading(false);
		
		if (EventStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const onSubmit = async (values: Values) => {
		if (imagePreview === undefined) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newEvent: CreateEvent = {
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
	
	const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setImagePreview(file);
		}
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : event.image}/>
			
			<div className={css.info}>
				<Input label={"Изображение"}
				       type={"file"}
				       placeholder={"Выберите главное изображение"}
				       defaultValue={""}
				       name={"image"}
				       onChange={handleImage}
				/>
				
				<Input label={"Название"}
				       type={"text"}
				       placeholder={"Введите заголовок статьи"}
				       defaultValue={event.title}
				       name={"title"}
				       onChange={title.onChange}
				/>
				
				<Select values={shops}
				        label={"Выберите магазин"}
				        defaultValue={event.shop.id}
				        onChange={shop.onChange}
				/>
				
				<Input label={"Текст статьи"}
				       type={"text"}
				       placeholder={"Введите текст статьи"}
				       defaultValue={event.description}
				       name={"description"}
				       onChange={description.onChange}
				/>
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Изменить"} disabled={isLoading} submit/>
				<Button text={"Удалить"} disabled={isLoading} onClick={handleDelete}/>
			</div>
		</form>
	);
};

export default observer(Event);