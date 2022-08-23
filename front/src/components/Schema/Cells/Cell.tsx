import React, {memo} from "react";
import classNames from "classnames";

import css from "./cell.module.scss";

import {useNavigate} from "react-router-dom";
import MapStore from "../../../stores/MapStore";
import Cell from "../../../api/interfaces/cell/Cell";
import map from "../../../data/map";

const Cell = ({ cell, readonly }: Props) => {
	const redirect = useNavigate();
	
	const onClick = () => {
		if (readonly) {
			MapStore.click(cell);
		} else {
			if (cell.shop) {
				redirect(cell.shop.routePath);
			}
			
			console.log(cell);
		}
	};
	
	return(
		<g className={classNames(css.wrapper)} onClick={onClick}>
			{map.find(item => item.number === cell.number)?.path}
		</g>
	);
};

interface Props {
	cell: Cell,
	readonly?: boolean;
}


export default memo(Cell);