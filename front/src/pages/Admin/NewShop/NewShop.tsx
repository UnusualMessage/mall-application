import {ChangeEventHandler, useMemo, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import Image from "../../../components/Image";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import LoadingOverlay from "../../../components/LoadingOverlay";

import categoriesData from "../../../data/categories";
import getShopForm from "../../../utils/getShopForm";
import useForm, {Values} from "../../../hooks/useForm";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import CreateShop from "../../../api/interfaces/shop/CreateShop";
import ShopStore from "../../../stores/ShopStore";

const NewShop = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	const isLoading = InterfaceStore.isLoading();
	
	const form = useMemo(() => {
		return getShopForm();
	}, []);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, floor, schedule, phone, site, categories } = inputs;
	
	const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setImagePreview(file);
		}
	};
	
	const onSubmit = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		const newShop: CreateShop = {
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
		await ShopStore.createAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Image classes={classNames(css.image)}
			       source={imagePreview ? URL.createObjectURL(imagePreview) : ""}/>
			
			<div className={`${css.info}`}>
				<Input label={"Лого"}
				       type={"file"}
				       placeholder={"Выберите логотип магазина"}
				       defaultValue={""}
				       name={"image"}
				       onChange={handleImage}
				/>
				
				<Input label={"Название"}
				       type={"text"}
				       placeholder={"Введите название магазина"}
				       defaultValue={""}
				       name={"title"}
				       onChange={title.onChange}
				/>
				
				<Input label={"Этаж"}
				       type={"text"}
				       placeholder={"Введите номер этажа"}
				       defaultValue={""}
				       name={"floor"}
				       onChange={floor.onChange}
				/>
				
				<Input label={"Время"}
				       type={"text"}
				       placeholder={"Введите время работы"}
				       defaultValue={""}
				       name={"schedule"}
				       onChange={schedule.onChange}
				/>
				
				<Input label={"Телефон"}
				       type={"text"}
				       placeholder={"Введите номер телефона"}
				       defaultValue={""}
				       name={"phone"}
				       onChange={phone.onChange}
				/>
				
				<Input label={"Сайт"}
				       type={"text"}
				       placeholder={"Введите адрес сайта"}
				       defaultValue={""}
				       name={"site"}
				       onChange={site.onChange}
				/>
				
				<Select values={categoriesData}
				        onChange={categories.onChange}
				        label={"Выбор категории"}
				        defaultValue={"1"}/>
				
				<Input label={"Текст статьи"}
				       type={"text"}
				       placeholder={"Введите текст статьи"}
				       defaultValue={""}
				       name={"description"}
				       onChange={site.onChange}
				/>
			</div>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Добавить"} submit disabled={isLoading}/>
			</div>
		</form>
	);
};

export default observer(NewShop);