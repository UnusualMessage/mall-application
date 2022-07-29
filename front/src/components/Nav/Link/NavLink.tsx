import React from "react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

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
	
	const onClick = () => {
		InterfaceStore.closeMenu();
	};
	
	return(
		<InnerLink className={`${linkStyle} ${link.hovered}`} to={to} onClick={onClick}>
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