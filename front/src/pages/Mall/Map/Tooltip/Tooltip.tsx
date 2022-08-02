import React, {memo} from "react";

import css from "./tooltip.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";
import Image from "../../../../components/Image";

import Shop from "../../../../api/interfaces/shop/Shop";

const Tooltip = ({ shop, position, visible }: Props) => {
	
	let classes = `${css.wrapper}`;
	if (visible) {
		classes = `${css.wrapper} ${css.visible}`;
	}
	
	return(
		<div className={classes} style={{ left: position.left, top: position.top }}>
			<div className={css.logo}>
				<Image classes={""} source={shop.image}/>
			</div>
			
			<div className={css.info}>
				<Label text={shop.title} className={label.mini}/>
				<InnerLink className={""} to={"/" + shop.route}>
					<Label text={"к магазину..."} className={`${label.mini} ${link.underlined}`}/>
				</InnerLink>
			</div>
		</div>
	);
};

interface Position {
	left: number,
	top: number
}

interface Props {
	shop: Shop,
	position: Position,
	visible: boolean
}

export default memo(Tooltip);