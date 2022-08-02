import React from "react";

import css from "./cell.module.scss";

const Cell = ({ children }: Props) => {
	return(
		<g className={css.wrapper}>
			{children}
		</g>
	);
};

interface Props {
	children: React.ReactNode,
}


export default Cell;