import React, {memo} from "react";
import classNames from "classnames";

import css from "./index.module.scss";

import {useNavigate} from "react-router-dom";
import MapStore from "../../../stores/MapStore";
import Cell from "../../../api/interfaces/cell/Cell";
import map from "../../../data/map";

const Cell = ({ cell, readonly }: Props) => {
	const redirect = useNavigate();
	
	const className = classNames({
		[css.disabled]: readonly && cell.shop || !readonly && !cell.shop,
		[css.active]: readonly && !cell.shop || !readonly && cell.shop
	});
	
	const onClick = () => {
		if (readonly) {
			if (!cell.shop) {
				MapStore.click(cell);
			}
		} else {
			if (cell.shop) {
				redirect(cell.shop.routePath);
			}
		}
	};
	
	return(
		<g className={className} onClick={onClick}>
			{map.find(item => item.number === cell.number)?.path}
		</g>
	);
};

interface Props {
	cell: Cell,
	readonly?: boolean;
}


export default memo(Cell);