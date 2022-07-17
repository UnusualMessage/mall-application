import css from "./header.module.scss";
import label from "../common/Label/label.module.scss";
import icon from "../common/Icon/icon.module.scss";
import outer from "../common/Outer/outer.module.scss";

import Label from "../common/Label";
import Icon from "../common/Icon";
import Image from "../common/Image";
import Outer from "../common/Outer";

import contacts from "../../data/contacts";
import icons from "../../data/icons";

const Header = () => {
	return (
		<header className={`${css.wrapper}`}>
			<div className={`${css.inner}`}>
				<div className={`${css.start}`}>
					<Icon viewBox={"0 0 384.97 384.97"} classes={`${css.menu}`}>
						{icons.menu}
					</Icon>
					
					<Image classes={css.logo} source={"/Logo.png"} />
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.city} classes={`${label.bold}`}/>
					<Label text={contacts.street} classes={`${label.mini}`}/>
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.schedule} classes={`${label.bold}`}/>
					<Label text={"Время работы"} classes={`${label.mini}`}/>
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.phone} classes={`${label.bold}`}/>
					<Label text={"Контактный телефон"} classes={`${label.mini}`}/>
				</div>
				
				<div className={`${css.socials}`}>
					<Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
						<Icon viewBox={"0 0 95.481 95.481"} classes={`${icon.icon}`}>
							{icons.vk}
						</Icon>
					</Outer>
					
					<Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
						<Icon viewBox={"0 0 20 20"} classes={`${icon.icon}`}>
							{icons.odnoklassniki}
						</Icon>
					</Outer>
				</div>
			</div>
		</header>
	);
};

export default Header;