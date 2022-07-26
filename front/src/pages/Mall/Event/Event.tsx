import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";

import css from "./event.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";

import icons from "../../../data/icons";
import {HomeRoute} from "../../../data/routes";
import events from "../../../data/events";

const Event = () => {
	const [textHidden, setTextHidden] = useState(true);
	
	const { eventId } = useParams();
	const redirect = useNavigate();
	
	const event = events.find(shop => shop.link === eventId);
	
	useEffect(() => {
		if (!event) {
			redirect(HomeRoute.route);
		}
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	const onClick = useCallback(() => {
		setTextHidden(!textHidden);
	}, [textHidden]);
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.info}`}>
				<Image classes={`${css.image}`} source={event.image}/>
				
				<div className={`${css.contacts}`}>
					<Label text={`${event.title}-й этаж`} className={`${label.big}`}/>
					<Label text={event.title} className={`${label.big}`}/>
					<Label text={event.title} className={`${label.big}`}/>
					
					<OuterLink className={`${link.hovered}`} to={`https://${event.title}`}>
						<Label text={event.title} className={`${label.big} ${label.hovered}`}/>
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
					<Label text={event.description} className={`${label.default}`}/>
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

export default Event;