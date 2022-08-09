import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {ChangeEventHandler, MouseEventHandler, useEffect, useMemo, useState} from "react";
import classNames from "classnames";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Image from "../../../components/Image";
import LoadingOverlay from "../../../components/LoadingOverlay";

import discounts from "../../../data/discounts";
import DiscountStore from "../../../stores/DiscountStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import shops from "../../../data/shops";
import getDiscountForm from "../../../utils/getDiscountForm";
import useForm, {Values} from "../../../hooks/useForm";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";

const Discount = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	
	const { id } = useParams();
	const redirect = useNavigate();
	
	const isLoading = InterfaceStore.isLoading();
	
	const discount = discounts.find(discount => discount.link === id);
	
	const form = useMemo(() => {
		return getDiscountForm(discount);
	}, [discount]);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, description, shop } = inputs;
	
	useEffect(() => {
		if (!discount) {
			redirect("");
		}
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		InterfaceStore.setLoading(true);
		await DiscountStore.deleteAsync({ id: discount.id });
		InterfaceStore.setLoading(false);
		
		if (DiscountStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const onSubmit = async (values: Values) => {
		if (imagePreview === undefined) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newDiscount: UpdateDiscount = {
			id: discount.id,
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
			       source={imagePreview ? URL.createObjectURL(imagePreview) : discount.image}/>
			
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
				       defaultValue={discount.title}
				       name={"title"}
				       onChange={title.onChange}
				/>
				
				<Select values={shops}
				        label={"Выберите магазин"}
				        defaultValue={discount.shop.id}
				        onChange={shop.onChange}
				/>
				
				<Input label={"Текст статьи"}
				       type={"text"}
				       placeholder={"Введите текст статьи"}
				       defaultValue={discount.description}
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

export default observer(Discount);