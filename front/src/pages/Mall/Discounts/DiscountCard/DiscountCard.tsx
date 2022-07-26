import css from "./discountCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

import Discount from "../../../../api/interfaces/discount/Discount";

const DiscountCard = ({ discount }: Props) => {
	return(
		<InnerLink className={`${css.wrapper}`} to={discount.link}>
			<Image classes={`${css.logo}`} source={discount.image}/>
			<Label text={discount.title} className={`${css.title} ${label.default} ${label.bold}`}/>
			
			<div className={`${css.more}`}>
				<div className={`${css.info}`}>
					<Label text={"8 800 200-95-55"} className={`${label.mini}`}/>
					<Label text={"www.perekrestok.ru"} className={`${label.mini}`}/>
				</div>
				
				<Label text={"1-й этаж"} className={`${css.floor} ${label.mini}`}/>
			</div>
		</InnerLink>
	);
};

interface Props {
	discount: Discount
}

export default DiscountCard;