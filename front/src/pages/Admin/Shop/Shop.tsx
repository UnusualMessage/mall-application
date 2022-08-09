import {useNavigate, useParams} from "react-router-dom";
import {ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "./shop.module.scss";

import Image from "../../../components/Image";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select/Select";
import Loader from "../../../components/Loader";

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
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const form = useMemo(() => {
		return getShopForm(shop);
	}, [shop]);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, floor, schedule, phone, site, categories } = inputs;
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
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
	
	const onSubmit = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
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
			route: `/routes/${transliteratedTitle}`
		};
		
		console.log(newShop);
		
		lockInterface();
		await ShopStore.updateAsync(newShop);
		unlockInterface();
	};
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		lockInterface();
		await ShopStore.deleteAsync({ id: shop.id });
		unlockInterface();
		
		if (ShopStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setImagePreview(file);
		}
	};
	
	return(
		<>
			{
				InterfaceStore.isLoading()
					?
					<Loader/>
					:
					<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
						<Image classes={classNames(css.image)}
						       source={imagePreview ? URL.createObjectURL(imagePreview) : shop.image}/>
						
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
							       defaultValue={shop.title}
							       name={"title"}
							       onChange={title.onChange}
							/>
							
							<Input label={"Этаж"}
							       type={"text"}
							       placeholder={"Введите номер этажа"}
							       defaultValue={shop.floor}
							       name={"floor"}
							       onChange={floor.onChange}
							/>
							
							<Input label={"Время"}
							       type={"text"}
							       placeholder={"Введите время работы"}
							       defaultValue={shop.schedule}
							       name={"schedule"}
							       onChange={schedule.onChange}
							/>
							
							<Input label={"Телефон"}
							       type={"text"}
							       placeholder={"Введите номер телефона"}
							       defaultValue={shop.phone}
							       name={"phone"}
							       onChange={phone.onChange}
							/>
							
							<Input label={"Сайт"}
							       type={"text"}
							       placeholder={"Введите адрес сайта"}
							       defaultValue={shop.site}
							       name={"site"}
							       onChange={site.onChange}
							/>
							
							<Select values={categoriesData}
							        onChange={categories.onChange}
							        label={"Выбор категории"}
							        defaultValue={shop.categories[1].id}/>
							
							<Input label={"Текст статьи"}
							       type={"text"}
							       placeholder={"Введите текст статьи"}
							       defaultValue={shop.description}
							       name={"description"}
							       onChange={site.onChange}
							/>
						</div>
						
						<div className={classNames(css.buttons)}>
							<Button text={"Изменить"} disabled={buttonsDisabled} submit/>
							<Button text={"Удалить"} disabled={buttonsDisabled} onClick={handleDelete}/>
						</div>
					</form>
			}
		</>
	);
};

export default observer(Shop);