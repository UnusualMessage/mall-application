import {useNavigate, useParams} from "react-router-dom";
import {MouseEventHandler, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import Image from "../../../components/Image";
import Button from "../../../components/Button";
import {ImageInput, SelectInput, TextInput} from "../../../components/Input";
import LoadingOverlay from "../../../components/LoadingOverlay";

import ShopInterface from "../../../api/interfaces/shop/Shop";
import shops from "../../../data/shops";
import InterfaceStore from "../../../stores/InterfaceStore";
import categoriesData from "../../../data/categories";
import useForm, {Values} from "../../../hooks/useForm";
import ShopStore from "../../../stores/ShopStore";
import getShopForm from "../../../utils/getShopForm";
import transliterate from "../../../utils/transliterate";
import UpdateShop from "../../../api/interfaces/shop/UpdateShop";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [shop, setShop] = useState<ShopInterface>();
	const [imagePreview, setImagePreview] = useState<File>();
	
	const isLoading = InterfaceStore.isLoading();
	
	const form = useMemo(() => {
		return getShopForm(shop);
	}, [shop]);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, floor, schedule, phone, site, categories, description } = inputs;
	
	useEffect(() => {
		const shop = shops.find(shop => shop.link === id);
		
		if (!shop) {
			redirect("../");
		}
		
		setShop(shop);
	}, [id]);
	
	if (!shop) {
		return null;
	}
	
	const handleUpdate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		console.log(values);
		
		const newShop: UpdateShop = {
			id: shop.id,
			title: values.title,
			description: values.description,
			floor: values.floor,
			schedule: values.schedule,
			phone: values.phone,
			categories: [values.categories],
			image: imagePreview,
			link: transliteratedTitle,
			route: `/shops/${transliteratedTitle}`
		};
		
		InterfaceStore.setLoading(true);
		await ShopStore.updateAsync(newShop);
		InterfaceStore.setLoading(false);
		
		if (ShopStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleDelete: MouseEventHandler = async () => {
		InterfaceStore.setLoading(true);
		await ShopStore.deleteAsync({ id: shop.id });
		InterfaceStore.setLoading(false);
		
		if (ShopStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(handleUpdate)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : shop.image}/>
			
			<div className={`${css.info}`}>
				<ImageInput {...form.image.options} setImage={setImagePreview}/>
				<TextInput {...form.title.options} defaultValue={shop.title} onChange={title.onChange} />
				<TextInput {...form.floor.options} defaultValue={shop.floor} onChange={floor.onChange} />
				<TextInput {...form.schedule.options} defaultValue={shop.schedule} onChange={schedule.onChange} />
				<TextInput {...form.phone.options} defaultValue={shop.phone} onChange={phone.onChange} />
				<TextInput {...form.site.options} defaultValue={shop.site} onChange={site.onChange} />
				
				<SelectInput {...form.categories.options}
				             defaultValue={shop.categories[1].id}
				             onChange={categories.onChange}
				             values={categoriesData}
				/>
				
				<TextInput {...form.description.options} defaultValue={shop.description} onChange={description.onChange} />
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Изменить"} disabled={isLoading} submit/>
				<Button text={"Удалить"} disabled={isLoading} onClick={handleDelete}/>
			</div>
		</form>
	);
};

export default observer(Shop);