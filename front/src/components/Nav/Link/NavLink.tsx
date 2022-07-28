import React from "react";
import {observer} from "mobx-react-lite";

import css from "./link.module.scss";
import label from "../../Label/label.module.scss";
import link from "../../Link/link.module.scss";

import {InnerLink} from "../../Link";
import Label from "../../Label";
import Icon from "../../Icon";
import InterfaceStore from "../../../stores/InterfaceStore";

const NavLink = ({children, title, to, viewBox}: Props) => {
	let linkStyle;
	
	if (InterfaceStore.isMenuActive()) {
		linkStyle = `${css.wrapper} ${css.burger}`;
	} else {
		linkStyle = `${css.wrapper}`;
	}
	
	return(
		<InnerLink className={`${linkStyle} ${link.hovered}`} to={to}>
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

export default observer(NavLink);