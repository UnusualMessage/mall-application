import React from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./index.module.scss";
import label from "../../Label/label.module.scss";
import link from "../../Link/link.module.scss";

import {InnerLink} from "../../Link";
import Label from "../../Label";
import Icon from "../../Icon";

import InterfaceStore from "../../../stores/InterfaceStore";

const NavLink = ({children, title, to, viewBox}: Props) => {
	const classes = classNames({
		[css.wrapper]: true,
		[css.burger]: InterfaceStore.isMenuActive(),
		[link.hovered]: true
	});
	
	const onClick = () => {
		InterfaceStore.closeMenu();
	};
	
	return(
		<InnerLink className={classes} to={to} onClick={onClick}>
			<Icon className={classNames(css.icon)} viewBox={viewBox} icon={children}/>
			<Label text={title} className={classNames(css.title, label.mini, label.upper, label.bold)}/>
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