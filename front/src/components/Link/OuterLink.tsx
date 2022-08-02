import React from "react";
import classNames from "classnames";

import css from "./link.module.scss";

const OuterLink = ({ className, children, to}: Props) => {
	return (
		<a className={classNames(css.default, className)} href={to}>
			{children}
		</a>
	);
};

interface Props {
	className: string,
	children: React.ReactNode,
	to: string
}

export default OuterLink;