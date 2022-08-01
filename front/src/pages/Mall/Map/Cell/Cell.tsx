import React, {MouseEventHandler} from "react";

import css from "./cell.module.scss";

const Cell = ({ children, onClick }: Props) => {
	return(
		<g className={css.wrapper} onClick={onClick}>
			{children}
		</g>
	);
};

interface Props {
	children: React.ReactNode,
	onClick: MouseEventHandler<SVGGElement>
}


export default Cell;