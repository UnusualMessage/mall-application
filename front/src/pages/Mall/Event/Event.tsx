import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

import css from "./event.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {InnerLink, OuterLink} from "../../../components/Link";

import icons from "../../../data/icons";
import {HomeRoute} from "../../../data/routes";
import events from "../../../data/events";
import Hider from "../../../components/Hider";

const Event = () => {
	const { eventId } = useParams();
	const redirect = useNavigate();
	
	const event = events.find(event => event.link === eventId);
	
	useEffect(() => {
		if (!event) {
			redirect(HomeRoute.route);
		}
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.info}`}>
				<InnerLink className={`${css.image}`} to={"/" + event.shop.route}>
					<Image classes={""} source={event.shop.image}/>
				</InnerLink>
				
				<div className={`${css.contacts}`}>
					<Label text={`${event.shop.floor}-й этаж`} className={`${label.big}`}/>
					<Label text={event.shop.schedule} className={`${label.big}`}/>
					<Label text={event.shop.phone} className={`${label.big}`}/>
					
					<OuterLink className={`${link.hovered}`} to={`https://${event.shop.site}`}>
						<Label text={event.shop.site} className={`${label.big} ${label.hovered}`}/>
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
				<Image classes={""} source={event.image}/>
				<Label text={event.description} className={`${label.default}`}/>
			</Hider>
		</div>
	);
};

export default Event;