import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import classNames from "classnames";

import css from "./shop.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";
import Hider from "../../../components/Hider";

import shops from "../../../data/shops";
import icons from "../../../data/icons";
import Input from "../../../components/Input";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const shop = shops.find(shop => shop.link === id);
	
	useEffect(() => {
		if (!shop) {
			redirect("");
		}
	}, [shop]);
	
	if (!shop) {
		return null;
	}

	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.shop)}>
				<div className={classNames(css.info)}>
					<Image classes={classNames(css.image)} source={shop.image}/>
					
					<div className={`${css.contacts}`}>
						<Input label={"Этаж"} value={shop.floor} placeholder={"Введите номер этажа"}/>
						<Input label={"Время"} value={shop.schedule} placeholder={"Введите время работы"}/>
						<Input label={"Телефон"} value={shop.phone} placeholder={"Введите номер телефона"}/>
						<Input label={"Сайт"} value={shop.site} placeholder={"Введите адрес сайта"}/>
					</div>
				</div>
				
				<Hider className={classNames(css.description)} defaultHeight={230}>
					<Label className={classNames(label.default)} text={shop.description}/>
				</Hider>
			</div>
		</div>
	);
};

export default Shop;