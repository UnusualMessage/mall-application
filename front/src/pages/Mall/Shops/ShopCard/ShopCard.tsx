import classNames from "classnames";
import {memo} from "react";

import css from "./shopCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

import Shop from "../../../../api/interfaces/shop/Shop";

const ShopCard = ({ shop }: Props) => {
	return(
		<InnerLink className={classNames(css.wrapper)} to={shop.routePath}>
			<Image classes={classNames(css.logo)} source={shop.image}/>
			<Label className={classNames(css.title, label.default, label.bold)} text={shop.title}/>

			<div className={classNames(css.more)}>
				<div className={classNames(css.info)}>
					<Label className={classNames(label.mini)} text={shop.phone}/>
					<Label className={classNames(label.mini)} text={shop.site}/>
				</div>
				
				<Label className={classNames(css.floor, label.mini)} text={`${shop.floor}-й этаж`}/>
			</div>
		</InnerLink>
	);
};

interface Props {
	shop: Shop
}

export default memo(ShopCard);