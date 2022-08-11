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
import ShopInterface from "../../../api/interfaces/shop/Shop";
import ShopStore from "../../../stores/ShopStore";
import Loader from "../../../components/Loader";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [shop, setShop] = useState<ShopInterface>();
	
	useEffect(() => {
		const getShop = async () => {
			const shops = await ShopStore.getAsync(`Filters=Id==${id}`);
			
			if (shops.length !== 0) {
				setShop(shops[0]);
			} else {
				redirect("/");
			}
		};
		
		void getShop();
	}, [id]);
	
	return(
		<div className={classNames(css.wrapper)}>
			{
				shop ?
					<div className={classNames(css.shop)}>
						<div className={classNames(css.info)}>
							<Image classes={classNames(css.image)} source={shop.image}/>
							
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
					
					: <Loader/>
			}
		</div>
	);
};

export default Shop;