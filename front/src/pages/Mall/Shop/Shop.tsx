import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";

import css from "./shop.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";
import styles from "/src/components/styles.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";
import PicturesCarousel from "../../../components/PicturesCarousel";
import Hider from "../../../components/Hider";

import shops from "../../../data/shops";
import icons from "../../../data/icons";
import {routes} from "../../../data/routes";
import DiscountStore from "../../../stores/DiscountStore";
import EventStore from "../../../stores/EventStore";

const Shop = () => {
	const { shopId } = useParams();
	const redirect = useNavigate();
	
	const shop = shops.find(shop => shop.link === shopId);
	
	useEffect(() => {
		if (!shop) {
			redirect(routes[0].path);
		}
	}, [shop]);
	
	if (!shop) {
		return null;
	}
	
	const discounts = useMemo(() => {
		return DiscountStore.getDiscountsByShopId(shop.id);
	}, [shop.id]);
	
	const events = useMemo(() => {
		return EventStore.getEventsByShopId(shop.id);
	}, [shop.id]);
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.shop}`}>
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
				
				<Hider className={`${css.description}`} defaultHeight={230}>
					<Label text={shop.description} className={`${label.default}`}/>
				</Hider>
			</div>
			
			{
				discounts.length ?
					<PicturesCarousel images={discounts}
					                  title={"Акции"}
					                  linkLabel={"Все акции"}
					                  borderColor={`${styles.greenBorder}`}
					                  to={"/discounts"}
					                  cols={4} rows={1}/>
					:
					<> </>
			}
			
			{
				events.length ?
					<PicturesCarousel images={events}
					                  title={"События"}
					                  linkLabel={"Все события"}
					                  borderColor={`${styles.blueBorder}`}
					                  to={"/discounts"}
					                  cols={3} rows={1}/>
					:
					<> </>
			}
			
		</div>
	);
};

export default Shop;