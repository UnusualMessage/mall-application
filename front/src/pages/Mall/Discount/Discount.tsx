import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useCallback, useEffect, useState} from "react";

import css from "./discount.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";

import {HomeRoute} from "../../../data/routes";
import discounts from "../../../data/discounts";
import Icon from "../../../components/Icon";
import icons from "../../../data/icons";

const Discount = () => {
	const [textHidden, setTextHidden] = useState(true);
	
	const { discountId } = useParams();
	const redirect = useNavigate();
	
	const discount = discounts.find(discount => discount.link === discountId);
	
	useEffect(() => {
		if (!discount) {
			redirect(HomeRoute.route);
		}
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	const onClick = useCallback(() => {
		setTextHidden(!textHidden);
	}, [textHidden]);
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.info}`}>
				<Image classes={`${css.image}`} source={discount.shop.image}/>
				
				<div className={`${css.contacts}`}>
					<Label text={`${discount.shop.floor}-й этаж`} className={`${label.big}`}/>
					<Label text={discount.shop.schedule} className={`${label.big}`}/>
					<Label text={discount.shop.phone} className={`${label.big}`}/>
					
					<OuterLink className={`${link.hovered}`} to={`https://${discount.shop.site}`}>
						<Label text={discount.shop.site} className={`${label.big} ${label.hovered}`}/>
					</OuterLink>
					
					<div className={`${css.socials}`}>
						<OuterLink className={`${link.hovered}`} to={"https://vk.com"}>
							<Icon className={""} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						
						<OuterLink className={`${link.hovered}`} to={"https://vk.com"}>
							<Icon className={""} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						
						<OuterLink className={`${link.hovered}`} to={"https://vk.com"}>
							<Icon className={""} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						<OuterLink className={`${link.hovered}`} to={"https://vk.com"}>
							<Icon className={""} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
					</div>
				</div>
			</div>
			
			<div className={`${css.description}`}>
				<div className={`${css.text} ${textHidden ? css.hidden : ""}`}>
					<Image classes={`${css.image}`} source={discount.image}/>
					<Label text={discount.description} className={`${label.default}`}/>
				</div>
				
				{
					textHidden
						? <Label className={`${label.default} ${link.underlined}`}
						         text={"Читать дальше"}
						         onClick={onClick}/>
						
						: <Label className={`${label.default} ${link.underlined}`}
						         text={"Читать назад"}
						         onClick={onClick}/>
				}
			</div>
		
		</div>
	);
};

export default observer(Discount);