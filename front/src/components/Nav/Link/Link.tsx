import React from "react";

import css from "./link.module.scss";
import label from "../../common/Label/label.module.scss";
import inner from "../../common/Inner/inner.module.scss";

import Icon from "../../common/Icon";
import Label from "../../common/Label";
import Inner from "../../common/Inner";

const Link = ({children, title, to, viewBox}: LinkProps) => {
	return(
		<Inner classes={`${css.wrapper} ${inner.hovered}`} to={to}>
			<Icon viewBox={viewBox} classes={`${css.icon}`}>
				{children}
			</Icon>
			
			<Label text={title} classes={`${css.title} ${label.mini} ${label.upper} ${label.bold}`}/>
		</Inner>
	);
};

interface LinkProps {
	children: React.ReactNode,
	title: string,
	to: string,
	viewBox: string
}

export default Link;