import React from "react";
import classNames from "classnames";

import css from "./cell.module.scss";

const Cell = ({ children }: Props) => {
	return(
		<g className={classNames(css.wrapper)}>
			{children}
		</g>
	);
};

interface Props {
	children: React.ReactNode,
}


export default Cell;