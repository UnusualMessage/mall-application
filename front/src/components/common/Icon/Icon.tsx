import React from "react";

import css from "./icon.module.scss";

const Icon = ({ viewBox, children, classes }: Props) => {
	return(
		<svg className={`${css.default} ${classes}`} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
			{children}
		</svg>
	);
};

interface Props {
	viewBox: string,
	children: React.ReactNode,
	classes: string
}

export default Icon;
