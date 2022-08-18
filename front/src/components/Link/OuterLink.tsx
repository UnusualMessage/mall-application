import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import classNames from "classnames";

import css from "./link.module.scss";

const OuterLink = ({ className, children, to}: Props) => {
	return (
		<a className={classNames(css.default, className)} href={to} aria-label={"outer-link"}>
			{children}
		</a>
	);
};

interface Props extends DetailedHTMLProps<HTMLAttributes<any>, HTMLLinkElement>{
	className: string,
	children: React.ReactNode,
	to: string
}

export default OuterLink;