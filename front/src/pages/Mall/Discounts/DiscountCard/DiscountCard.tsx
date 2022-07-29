import css from "./discountCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

import Discount from "../../../../api/interfaces/discount/Discount";

const DiscountCard = ({ discount }: Props) => {
	return(
		<InnerLink className={`${css.wrapper}`} to={discount.link}>
			<div className={`${css.info}`}>
				<Label text={discount.title} className={`${label.default} ${label.white} ${label.bold} ${css.title}`}/>
			</div>
			<Image classes={`${css.logo}`} source={discount.image}/>
		</InnerLink>
	);
};

interface Props {
	discount: Discount
}

export default DiscountCard;