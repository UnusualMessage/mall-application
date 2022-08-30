import classNames from "classnames";

import css from "./index.module.scss";

import {OuterLink} from "../Link";
import Icon from "../Icon";

import icons from "../../data/icons";

const Socials = () => {
	return(
		<div className={classNames(css.wrapper)}>
			<OuterLink className={classNames(css.social)} to={"https://vk.com"}>
				<Icon className={classNames(css.icon)} viewBox={"0 0 20 20"} icon={icons.vk}/>
			</OuterLink>
			
			<OuterLink className={classNames(css.social)} to={"https://ok.ru"}>
				<Icon className={classNames(css.icon)} viewBox={"0 0 95.481 95.481"} icon={icons.odnoklassniki}/>
			</OuterLink>
		</div>
	);
};

export default Socials;