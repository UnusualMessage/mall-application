import {observer} from "mobx-react-lite";

import css from "./discountCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";

import DiscountStore from "../../../../stores/DiscountStore";
import toRightForm from "../../../../utils/toRightForm";
import DiscountCard from "../DiscountCard";
import InterfaceStore from "../../../../stores/InterfaceStore";

const DiscountCards = () => {
	const discountsCount = DiscountStore.getCount();
	
	const onFilterSwitch = () => {
		InterfaceStore.switchFilter();
	};
	
	let classes = `${css.wrapper}`;
	if (InterfaceStore.isFilterActive()) {
		classes += ` ${css.moved}`;
	}
	
	return(
		<div className={classes}>
			<div className={`${css.pre}`}>
				<Label text={"Фильтр"} className={`${css.switcher} ${label.mini} ${label.upper}`} onClick={onFilterSwitch}/>
				
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