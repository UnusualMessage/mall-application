import classNames from "classnames";

import link from "../Link/link.module.scss";
import css from "./socials.module.scss";

import {OuterLink} from "../Link";
import Icon from "../Icon";

import icons from "../../data/icons";

const Socials = () => {
	return(
		<div className={classNames(css.wrapper)}>
			<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
				<Icon className={""} viewBox={"0 0 20 20"} icon={icons.vk}/>
			</OuterLink>
			
			<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
				<Icon className={""} viewBox={"0 0 95.481 95.481"} icon={icons.odnoklassniki}/>
			</OuterLink>
		</div>
	);
};

export default Socials;