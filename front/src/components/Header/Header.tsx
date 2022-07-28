import { observer } from "mobx-react-lite";

import css from "./header.module.scss";
import label from "../Label/label.module.scss";
import link from "../Link/link.module.scss";

import Image from "../Image";
import Icon from "../Icon";
import Label from "../Label";
import {OuterLink} from "../Link";

import contacts from "../../data/contacts";
import icons from "../../data/icons";
import InterfaceStore from "../../stores/InterfaceStore";

const Header = () => {
	const onMenuShow = () => {
		InterfaceStore.switchMenu();
	};
	
	return (
		<header className={`${css.wrapper}`}>
			<div className={`${css.inner}`}>
				<div className={`${css.start}`}>
					<Icon className={`${css.menu}`} viewBox={"0 0 512 512"} icon={icons.menu} onClick={onMenuShow}/>
					<Image classes={css.logo} source={"/Logo.png"} />
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.city} className={`${label.bold}`}/>
					<Label text={contacts.street} className={`${label.mini}`}/>
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.schedule} className={`${label.bold}`}/>
					<Label text={"Время работы"} className={`${label.mini}`}/>
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.phone} className={`${label.bold}`}/>
					<Label text={"Контактный телефон"} className={`${label.mini}`}/>
				</div>
				
				<div className={`${css.socials}`}>
					<OuterLink className={`${link.hovered}`} to={"https://vk.com"}>
						<Icon className={""} viewBox={"0 0 20 20"} icon={icons.vk}/>
					</OuterLink>
					
					<OuterLink className={`${link.hovered}`} to={"https://vk.com"}>
						<Icon className={""} viewBox={"0 0 95.481 95.481"} icon={icons.odnoklassniki}/>
					</OuterLink>
				</div>
			</div>
		</header>
	);
};

export default observer(Header);