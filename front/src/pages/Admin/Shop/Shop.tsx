import {useNavigate, useParams} from "react-router-dom";
import {FormEventHandler, useEffect, useState} from "react";
import classNames from "classnames";

import css from "./shop.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../components/Image";
import Label from "../../../components/Label";
import Hider from "../../../components/Hider";
import Input from "../../../components/Input";

import ShopInterface from "../../../api/interfaces/shop/Shop";
import shops from "../../../data/shops";
import useInput from "../../../hooks/useInput";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [shop, setShop] = useState<ShopInterface>();
	
	const floor = useInput("");
	const schedule = useInput("");
	const phone = useInput("");
	const site = useInput("");
	
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
	
	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();
	};

	return(
		<form className={classNames(css.wrapper)} onSubmit={onSubmit}>
			<div className={classNames(css.shop)}>
				<div className={classNames(css.info)}>
					<Image classes={classNames(css.image)} source={shop.image}/>
					
					<div className={`${css.contacts}`}>
						<Input label={"Этаж"} placeholder={"Введите номер этажа"} {...floor}/>
						<Input label={"Время"} placeholder={"Введите время работы"} {...schedule}/>
						<Input label={"Телефон"} placeholder={"Введите номер телефона"} {...phone}/>
						<Input label={"Сайт"} placeholder={"Введите адрес сайта"} {...site}/>
					</div>
				</div>
				
				<Hider className={classNames(css.description)} defaultHeight={230}>
					<Label className={classNames(label.default)} text={shop.description}/>
				</Hider>
			</div>
			
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