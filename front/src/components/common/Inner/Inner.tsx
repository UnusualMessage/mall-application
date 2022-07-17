import React from "react";
import {Link} from "react-router-dom";

import css from "./inner.module.scss";

const Inner = ({ classes, to, children }: Props) => {
	return(
		<Link className={`${css.default} ${classes}`} to={to}>
			{children}
		</Link>
	);
};

interface Props {
	classes: string,
	to: string,
	children: React.ReactNode
}

export default Inner;