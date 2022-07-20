import React from "react";

import css from "./icon.module.scss";

const Icon = ({ className, viewBox, icon }: Props) => {
	return(
		<svg className={`${css.default} ${className}`} viewBox={viewBox}>
			{icon}
		</svg>
	);
};

interface Props {
	className: string,
	viewBox: string,
	icon: React.ReactNode
}

export default Icon;
