import React from "react";
import classNames from "classnames";
import {OuterLink} from "../../Link";

const LinkElement = React.forwardRef<HTMLLinkElement, Props>((props, ref) => {
	return (
		<OuterLink className={classNames(props.classes)} ref={ref} to={props.to}>
			{props.children}
		</OuterLink>
	);
});

LinkElement.displayName = "LinkElement";

interface Props {
	children: React.ReactNode,
	classes: string,
	to: string
}