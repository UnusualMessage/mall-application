import {observer} from "mobx-react-lite";

import css from "./discountCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";

import DiscountStore from "../../../../stores/DiscountStore";
import toRightForm from "../../../../utils/toRightForm";
import DiscountCard from "../DiscountCard";

const DiscountCards = () => {
	const discountsCount = DiscountStore.getCount();
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.pre}`}>
				<div>
					<Label text={`${discountsCount}`} className={`${label.large}`}/>
					<Label text={toRightForm(discountsCount, [" акция", " акции", " акций"])}
					       className={`${label.default} ${label.big}`}/>
				</div>
			</div>
			
			<div className={`${css.list}`}>
				<div className={`${css.border}`}>
				
				</div>
				
				<div className={`${css.items}`}>
					{DiscountStore.getFiltered().map(discount => {
						return(
							<DiscountCard key={discount.id} discount={discount}/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default observer(DiscountCards);