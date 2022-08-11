import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import {ImageInput, SelectInput, TextInput} from "../../../components/Input";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Image from "../../../components/Image";

import InterfaceStore from "../../../stores/InterfaceStore";
import getEventForm from "../../../utils/getEventForm";
import useForm, {Values} from "../../../hooks/useForm";
import CreateEvent from "../../../api/interfaces/event/CreateEvent";
import EventStore from "../../../stores/EventStore";
import transliterate from "../../../utils/transliterate";
import ShopStore from "../../../stores/ShopStore";
import Shop from "../../../api/interfaces/shop/Shop";

const NewEvent = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	const [shops, setShops] = useState<Shop[]>([]);
	
	const isLoading = InterfaceStore.isLoading();
	
	useEffect(() => {
		const getShops = async () => {
			const shops = await ShopStore.getAsync("");
			setShops(shops);
		};
		
		void getShops();
	}, []);
	
	const form = useMemo(() => {
		return getEventForm();
	}, []);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, description, shop } = inputs;
	
	const handleCreate = async (values: Values) => {
		if (imagePreview === undefined) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newEvent: CreateEvent = {
			title: values.title,
			description: values.description,
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/events/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await EventStore.createAsync(newEvent);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(handleCreate)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : ""}/>
			
			<div className={css.info}>
				<ImageInput {...form.image.options} setImage={setImagePreview}/>
				<TextInput {...form.title.options} onChange={title.onChange} />
				<SelectInput {...form.shop.options} onChange={shop.onChange} values={shops}/>
				<TextInput {...form.description.options} onChange={description.onChange} />
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Добавить"} disabled={isLoading} submit/>
			</div>
		</form>
	);
};

export default observer(NewEvent);