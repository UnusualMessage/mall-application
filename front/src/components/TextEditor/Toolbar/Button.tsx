import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import classNames from "classnames";

import css from "./toolbar.module.scss";
import link from "/src/components/Link/link.module.scss";
import iconCss from "/src/components/Icon/icon.module.scss";

import Icon from "../../Icon";

const Button = ({ icon, active, ...props }: Props) => {
	const classes = classNames({
		[iconCss.active]: active
	});
	
	return (
		<span className={classNames(css.button, link.hovered)} {...props}>
			<Icon className={classes} viewBox={"0 0 24 24"} icon={icon}/>
		</span>
	);
};

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: React.ReactNode,
	active: boolean
}

export default Button;