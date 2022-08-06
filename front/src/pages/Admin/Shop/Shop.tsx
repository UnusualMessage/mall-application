import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import classNames from "classnames";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import css from "./shop.module.scss";

import Image from "../../../components/Image";
import Input from "../../../components/Input";
import TextEditor from "../../../components/TextEditor";

import ShopInterface from "../../../api/interfaces/shop/Shop";
import shops from "../../../data/shops";
import InterfaceStore from "../../../stores/InterfaceStore";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [shop, setShop] = useState<ShopInterface>();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
	const { register, handleSubmit } = useForm();
	
	const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
		console.log(data);
	}, []);
	
	useEffect(() => {
		const shop = shops.find(shop => shop.link === id);
		
		if (!shop) {
			redirect("");
		}
		
		setShop(shop);
	}, [id]);
	
	if (!shop) {
		return null;
	}
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			<Image classes={classNames(css.image)} source={shop.image}/>
			
			<div className={`${css.contacts}`}>
				<Input label={"Название"}
				       type={"text"}
				       placeholder={"Введите название магазина"}
				       defaultValue={shop.title}
				       register={register}
				       name={"name"}
				/>
				
				<Input label={"Этаж"}
				       type={"text"}
				       placeholder={"Введите номер этажа"}
				       defaultValue={shop.floor}
				       register={register}
				       name={"floor"}
				/>
				
				<Input label={"Время"}
				       type={"text"}
				       placeholder={"Введите время работы"}
				       defaultValue={shop.schedule}
				       register={register}
				       name={"schedule"}
				/>
				
				<Input label={"Телефон"}
				       type={"text"}
				       placeholder={"Введите номер телефона"}
				       defaultValue={shop.phone}
				       register={register}
				       name={"phone"}
				/>
				
				<Input label={"Сайт"}
				       type={"text"}
				       placeholder={"Введите адрес сайта"}
				       defaultValue={shop.site}
				       register={register}
				       name={"site"}
				/>
			</div>
			
			<TextEditor className={css.description} readonly={false}
			            defaultValue={"[{\"type\":\"paragraph\",\"align\":\"left\",\"children\":[{\"text\":\"Hello, world\",\"bold\":true,\"italic\":true}]}]"}/>
			
			<div className={classNames(css.buttons)}>
				<button type={"submit"}>
					Изменить
				</button>
				
				<button type={"submit"}>
					Удалить
				</button>
			</div>
		</form>
	);
};

export default Shop;