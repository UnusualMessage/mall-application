import React from "react";

import css from "./outer.module.scss";

const Outer = ({classes, to, children}: Props) => {
	return(
		<a className={`${css.default} ${classes}`} href={to}>
			{children}
		</a>
	);
};

interface Props {
	classes: string,
	to: string,
	children: React.ReactNode
}

export default Outer;