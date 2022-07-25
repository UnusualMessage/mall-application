import {useNavigate, useParams} from "react-router-dom";

import css from "./shop.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";

import shops from "../../../data/shops";
import icons from "../../../data/icons";
import {HomeRoute} from "../../../data/routes";

const Shop = () => {
	const { shopId } = useParams();
	const redirect = useNavigate();
	
	const shop = shops.find(shop => shop.link === shopId);
	
	if (!shop) {
		redirect(HomeRoute.route);
		return null;
	}
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.info}`}>
				<Image classes={`${css.image}`} source={shop.image}/>
				
				<div className={`${css.contacts}`}>
					<Label text={`${shop.floor}-й этаж`} className={`${label.big}`}/>
					<Label text={shop.schedule} className={`${label.big}`}/>
					<Label text={shop.phone} className={`${label.big}`}/>
					
					<OuterLink className={`${link.hovered}`} to={`https://${shop.site}`}>
						<Label text={shop.site} className={`${label.big} ${label.hovered}`}/>
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
				<Label text={shop.description} className={`${label.default}`}/>
			</div>
		</div>
	);
};

export default Shop;