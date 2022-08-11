import classNames from "classnames";
import {memo} from "react";

import css from "./discountCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

import Discount from "../../../../api/interfaces/discount/Discount";

const DiscountCard = ({ discount }: Props) => {
	return(
		<InnerLink className={classNames(css.wrapper)} to={discount.link}>
			<div className={classNames(css.info)}>
				<Label className={classNames(css.title, label.default, label.white, label.bold)} text={discount.title}/>
			</div>
			<Image classes={classNames(css.logo)} source={discount.image}/>
		</InnerLink>
	);
};

interface Props {
	discount: Discount
}

export default memo(DiscountCard);