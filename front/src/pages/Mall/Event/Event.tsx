import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import classNames from "classnames";

import css from "./event.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {InnerLink, OuterLink} from "../../../components/Link";
import Hider from "../../../components/Hider";

import icons from "../../../data/icons";
import events from "../../../data/events";
import {routes} from "../../../data/routes";

const Event = () => {
	const { eventId } = useParams();
	const redirect = useNavigate();
	
	const event = events.find(event => event.link === eventId);
	
	useEffect(() => {
		if (!event) {
			redirect(routes[0].path);
		}
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.info)}>
				<InnerLink className={classNames(css.image)} to={"/" + event.shop.route}>
					<Image classes={classNames()} source={event.shop.image}/>
				</InnerLink>
				
				<div className={`${css.contacts}`}>
					<Label className={classNames(label.big)} text={`${event.shop.floor}-й этаж`}/>
					<Label className={classNames(label.big)} text={event.shop.schedule}/>
					<Label className={classNames(label.big)} text={event.shop.phone}/>
					
					<OuterLink className={classNames(link.hovered)} to={`https://${event.shop.site}`}>
						<Label className={classNames(label.big, label.hovered)} text={event.shop.site}/>
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
				<Image classes={classNames()} source={event.image}/>
				<Label className={classNames(label.default)} text={event.description}/>
			</Hider>
		</div>
	);
};

export default Event;