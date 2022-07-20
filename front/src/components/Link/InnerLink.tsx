import {Link} from "react-router-dom";
import React from "react";

import css from "./link.module.scss";

const InnerLink = ({ className, children, to }: Props) => {
	return (
		<Link className={`${css.default} ${className}`} to={to}>
			{children}
		</Link>
	);
};

interface Props {
	className: string,
	children: React.ReactNode,
	to: string
}

export default InnerLink;