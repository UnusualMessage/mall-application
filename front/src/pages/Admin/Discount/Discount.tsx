import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {MouseEventHandler, useEffect, useMemo, useState} from "react";
import classNames from "classnames";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import {ImageInput, SelectInput, TextInput} from "../../../components/Input";
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
	
	const handleUpdate = async (values: Values) => {
		console.log(values);
		
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
			route: `/discounts/${transliteratedTitle}`,
			shopId: values.shop
		};
		
		InterfaceStore.setLoading(true);
		await DiscountStore.createAsync(newDiscount);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(handleUpdate)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : discount.image}/>
			
			<div className={css.info}>
				<ImageInput {...form.image.options} setImage={setImagePreview}/>
				<TextInput {...form.title.options} defaultValue={discount.title} onChange={title.onChange} />
				<SelectInput {...form.shop.options} defaultValue={discount.shop.id} onChange={shop.onChange} values={shops}/>
				<TextInput {...form.description.options} defaultValue={discount.description} onChange={description.onChange} />
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Изменить"} disabled={isLoading} submit/>
				<Button text={"Удалить"} disabled={isLoading} onClick={handleDelete}/>
			</div>
		</form>
	);
};

export default observer(Discount);