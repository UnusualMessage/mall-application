import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import classNames from "classnames";

import css from "./discount.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Label from "../../../components/Label";
import {InnerLink, OuterLink} from "../../../components/Link";
import Icon from "../../../components/Icon";
import Hider from "../../../components/Hider";

import discounts from "../../../data/discounts";
import icons from "../../../data/icons";

const Discount = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const discount = discounts.find(discount => discount.link === id);
	
	useEffect(() => {
		if (!discount) {
			redirect("");
		}
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.info)}>
				<InnerLink className={classNames(css.image)} to={"/" + discount.shop.route}>
					<Image classes={classNames()} source={discount.shop.image}/>
				</InnerLink>
				
				<div className={classNames(css.contacts)}>
					<Label className={classNames(label.big)} text={`${discount.shop.floor}-й этаж`} />
					<Label className={classNames(label.big)} text={discount.shop.schedule} />
					<Label className={classNames(label.big)} text={discount.shop.phone} />
					
					<OuterLink className={classNames(link.hovered)} to={`https://${discount.shop.site}`}>
						<Label className={classNames(label.big, label.hovered)} text={discount.shop.site} />
					</OuterLink>
					
					<div className={classNames(css.socials)}>
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
					</div>
				</div>
			</div>
			
			<Hider className={classNames(css.description)} defaultHeight={230}>
				<Image classes={classNames()} source={discount.image}/>
				<Label className={classNames(label.default)} text={discount.description}/>
			</Hider>
		</div>
	);
};

export default observer(Discount);