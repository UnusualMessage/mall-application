import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import classNames from "classnames";

import css from "./event.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import Label from "../../../components/Label";
import {InnerLink, OuterLink} from "../../../components/Link";
import Hider from "../../../components/Hider";
import Loader from "../../../components/Loader";

import icons from "../../../data/icons";
import EventStore from "../../../stores/EventStore";
import TextEditor from "../../../components/TextEditor/TextEditor";

const Event = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [isFetching, setIsFetching] = useState(true);
	
	const event = EventStore.getCurrent();
	
	useEffect(() => {
		const getEvent = async () => {
			await EventStore.getByIdAsync(id ?? "");
			const event = EventStore.getCurrent();
			
			setIsFetching(false);
			
			if (!event) {
				redirect("/");
			}
		};
		
		void getEvent();
	}, [id]);
	
	if (!event || isFetching) {
		return <Loader/>;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.info)}>
				<InnerLink className={classNames(css.image)} to={event.shop.routePath}>
					<Image classes={classNames()} source={event.shop.image.path}/>
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
				<TextEditor readonly text={event.description}/>
			</Hider>
		</div>
	);
};

export default Event;