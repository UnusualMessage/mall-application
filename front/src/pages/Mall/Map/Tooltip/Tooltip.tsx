import React, {memo} from "react";
import classNames from "classnames";

import css from "./tooltip.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";
import Image from "../../../../components/Image";

import Shop from "../../../../api/interfaces/shop/Shop";

const Tooltip = ({ shop, position, visible }: Props) => {
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.visible]: visible
	});
	
	return(
		<div className={classes} style={{ left: position.left, top: position.top }}>
			<div className={classNames(css.logo)}>
				<Image classes={""} source={shop.image}/>
			</div>
			
			<div className={classNames(css.info)}>
				<Label className={classNames(label.mini)} text={shop.title}/>
				<InnerLink className={classNames()} to={"/" + shop.route}>
					<Label className={classNames(label.mini, link.underlined)} text={"к магазину..."}/>
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