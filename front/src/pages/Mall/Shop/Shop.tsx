import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import classNames from "classnames";

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
		<div className={classNames(css.wrapper)}>
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