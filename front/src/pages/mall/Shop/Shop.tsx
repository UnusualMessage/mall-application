import {useNavigate, useParams} from "react-router-dom";

import css from "./shop.module.scss";
import label from "../../../components/common/Label/label.module.scss";
import outer from "../../../components/common/Outer/outer.module.scss";

import Image from "../../../components/common/Image";
import Label from "../../../components/common/Label";
import Outer from "../../../components/common/Outer";
import Icon from "../../../components/common/Icon";

import shops from "../../../data/shops";
import {HomeRoute} from "../../../data/routes";
import icons from "../../../data/icons";

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
					<Label text={`${shop.floor}-й этаж`} classes={`${label.big}`}/>
					<Label text={`${shop.schedule}`} classes={`${label.big}`}/>
					<Label text={`${shop.phone}`} classes={`${label.big}`}/>
					
					<Outer classes={""} to={`https://${shop.site}`}>
						<Label text={`${shop.site}`} classes={`${label.big} ${label.hovered}`}/>
					</Outer>
					
					<div className={`${css.socials}`}>
						<Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
							<Icon viewBox={"0 0 95.481 95.481"} classes={""}>
								{icons.vk}
							</Icon>
						</Outer>
						
						<Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
							<Icon viewBox={"0 0 20 20"} classes={""}>
								{icons.odnoklassniki}
							</Icon>
						</Outer>
						
						<Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
							<Icon viewBox={"0 0 20 20"} classes={""}>
								{icons.odnoklassniki}
							</Icon>
						</Outer>
						
						<Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
							<Icon viewBox={"0 0 20 20"} classes={""}>
								{icons.odnoklassniki}
							</Icon>
						</Outer>
					</div>
				</div>
			</div>
			
			<div className={`${css.description}`}>
				<Label text={shop.description} classes={""}/>
				<Label text={shop.description} classes={""}/>
				<Label text={shop.description} classes={""}/>
			</div>
		</div>
	);
};

export default Shop;