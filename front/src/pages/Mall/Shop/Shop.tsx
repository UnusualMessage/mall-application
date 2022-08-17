import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import classNames from "classnames";

import css from "./shop.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";
import Hider from "../../../components/Hider";

import icons from "../../../data/icons";
import ShopStore from "../../../stores/ShopStore";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [isLoading, setIsLoading] = useState(true);
	
	const shop = ShopStore.getCurrent();
	
	useEffect(() => {
		const getShop = async () => {
			await ShopStore.getByIdAsync(id ?? "");
			const shop = ShopStore.getCurrent();
			
			setIsLoading(false);
			
			if (!shop) {
				redirect("/");
			}
		};
		
		void getShop();
	}, [id]);
	
	if (!shop || isLoading) {
		return null;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.shop)}>
				<div className={classNames(css.info)}>
					<Image classes={classNames(css.image)} source={shop.image.path}/>
					
					<div className={`${css.contacts}`}>
						<Label className={classNames(label.big)} text={`${shop.floor}-й этаж`} />
						<Label className={classNames(label.big)} text={shop.schedule}/>
						<Label className={classNames(label.big)} text={shop.phone}/>
						
						<OuterLink className={classNames(link.hovered)} to={`https://${shop.site}`}>
							<Label className={classNames(label.big, label.hovered)} text={shop.site}/>
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
					<Label className={classNames(label.default)} text={shop.description}/>
				</Hider>
			</div>
		</div>
	);
};

export default Shop;