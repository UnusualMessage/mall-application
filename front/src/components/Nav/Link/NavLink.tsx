import React from "react";

import Icon from "../../Icon";
import Label from "../../Label";

import css from "./link.module.scss";
import label from "../../Label/label.module.scss";
import link from "../../Link/link.module.scss";
import {InnerLink} from "../../Link";

const NavLink = ({children, title, to, viewBox}: Props) => {
	return(
		<InnerLink className={`${css.wrapper} ${link.hovered}`} to={to}>
			<Icon className={""} viewBox={viewBox} icon={children}/>
			<Label text={title} className={`${css.title} ${label.mini} ${label.upper} ${label.bold}`}/>
		</InnerLink>
	);
};

interface Props {
	children: React.ReactNode,
	title: string,
	to: string,
	viewBox: string
}

export default NavLink;