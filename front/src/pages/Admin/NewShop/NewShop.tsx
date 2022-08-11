import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import Image from "../../../components/Image";
import {ImageInput, SelectInput, TextInput} from "../../../components/Input";
import Button from "../../../components/Button";
import LoadingOverlay from "../../../components/LoadingOverlay";

import getShopForm from "../../../utils/getShopForm";
import useForm, {Values} from "../../../hooks/useForm";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import CreateShop from "../../../api/interfaces/shop/CreateShop";
import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";
import Category from "../../../api/interfaces/category/Category";

const NewShop = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	const [categories, setCategories] = useState<Category[]>([]);
	
	const isLoading = InterfaceStore.isLoading();
	
	const form = useMemo(() => {
		return getShopForm();
	}, []);
	
	useEffect(() => {
		const getCategories = async () => {
			const categories = await CategoryStore.getAsync("");
			setCategories(categories);
		};
		
		void getCategories();
	}, []);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, floor, schedule, phone, site, category, description } = inputs;

	const handleCreate = async (values: Values) => {
		if (!imagePreview) {
			return;
		}
		
		const transliteratedTitle = transliterate(values.title);
		const newShop: CreateShop = {
			title: values.title,
			description: values.description,
			floor: Number(values.floor),
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryIds: [values.category],
			image: imagePreview,
			link: transliteratedTitle,
			routePath: `/shops/${transliteratedTitle}`
		};
		
		InterfaceStore.setLoading(true);
		await ShopStore.createAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(handleCreate)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : ""}/>
			
			<div className={`${css.info}`}>
				<ImageInput {...form.image.options} setImage={setImagePreview}/>
				<TextInput {...form.title.options} onChange={title.onChange} />
				<TextInput {...form.floor.options} onChange={floor.onChange} />
				<TextInput {...form.schedule.options} onChange={schedule.onChange} />
				<TextInput {...form.phone.options} onChange={phone.onChange} />
				<TextInput {...form.site.options} onChange={site.onChange} />
				<SelectInput {...form.category.options} onChange={category.onChange} values={categories}/>
				<TextInput {...form.description.options} onChange={description.onChange} />
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Добавить"} submit disabled={isLoading}/>
			</div>
		</form>
	);
};

export default observer(NewShop);