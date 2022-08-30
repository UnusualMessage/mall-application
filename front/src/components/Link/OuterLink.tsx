import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import classNames from "classnames";

import css from "./link.module.scss";

const OuterLink = React.forwardRef<HTMLAnchorElement, Props>((props, ref) => {
	return (
		<a className={classNames(css.default, props.className)} href={props.to} aria-label={"outer-link"} ref={ref}>
			{props.children}
		</a>
	);
});

interface Props extends DetailedHTMLProps<HTMLAttributes<any>, HTMLAnchorElement>{
	className: string,
	children: React.ReactNode,
	to: string,
}

OuterLink.displayName = "OuterLink";

export default OuterLink;