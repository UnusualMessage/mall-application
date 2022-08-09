import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {ChangeEventHandler, useMemo, useState} from "react";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Image from "../../../components/Image";

import shops from "../../../data/shops";
import getDiscountForm from "../../../utils/getDiscountForm";
import useForm, {Values} from "../../../hooks/useForm";
import InterfaceStore from "../../../stores/InterfaceStore";
import DiscountStore from "../../../stores/DiscountStore";
import transliterate from "../../../utils/transliterate";
import CreateDiscount from "../../../api/interfaces/discount/CreateDiscount";

const NewDiscount = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	
	const isLoading = InterfaceStore.isLoading();
	
	const form = useMemo(() => {
		return getDiscountForm();
	}, []);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, description, shop } = inputs;

	const onSubmit = async (values: Values) => {
		if (imagePreview === undefined) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newDiscount: CreateDiscount = {
			title: values.title,
			description: values.description,
			image: imagePreview,
			link: transliteratedTitle,
			route: `/events/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await DiscountStore.createAsync(newDiscount);
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
			       source={imagePreview ? URL.createObjectURL(imagePreview) : ""}/>
			
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
				       defaultValue={""}
				       name={"title"}
				       onChange={title.onChange}
				/>
				
				<Select values={shops}
				        label={"Выберите магазин"}
				        defaultValue={"1"}
				        onChange={shop.onChange}
				/>
				
				<Input label={"Текст статьи"}
				       type={"text"}
				       placeholder={"Введите текст статьи"}
				       defaultValue={""}
				       name={"description"}
				       onChange={description.onChange}
				/>
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Добавить"} disabled={isLoading} submit/>
			</div>
		</form>
	);
};

export default observer(NewDiscount);