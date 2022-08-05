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

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [shop, setShop] = useState<ShopInterface>();
	
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
				<Input label={"Этаж"}
				       placeholder={"Введите номер этажа"}
				       defaultValue={shop.floor}
				       register={register}
				       name={"floor"}
				/>
				
				<Input label={"Время"}
				       placeholder={"Введите время работы"}
				       defaultValue={shop.schedule}
				       register={register}
				       name={"schedule"}
				/>
				
				<Input label={"Телефон"}
				       placeholder={"Введите номер телефона"}
				       defaultValue={shop.phone}
				       register={register}
				       name={"phone"}
				/>
				
				<Input label={"Сайт"}
				       placeholder={"Введите адрес сайта"}
				       defaultValue={shop.site}
				       register={register}
				       name={"site"}
				/>
			</div>
			
			<TextEditor className={css.description}/>
			
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