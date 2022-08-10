import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./discountCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";
import DiscountCard from "../DiscountCard";

import DiscountStore from "../../../../stores/DiscountStore";
import InterfaceStore from "../../../../stores/InterfaceStore";
import toRightForm from "../../../../utils/toRightForm";

const DiscountCards = () => {
	const discountsCount = DiscountStore.getCount();
	
	const onFilterSwitch = () => {
		InterfaceStore.switchFilter();
	};
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.moved]: InterfaceStore.isFilterActive()
	});
	
	return(
		<div className={classes}>
			<div className={classNames(css.pre)}>
				<Label text={"Фильтр"} className={classNames(css.switcher, label.mini, label.upper)} onClick={onFilterSwitch}/>
				
				<div className={classNames(css.container)}>
					<Label className={classNames(label.large)} text={`${discountsCount}`}/>
					<Label text={toRightForm(discountsCount, [" акция", " акции", " акций"])}
					       className={classNames(label.default, label.big)}/>
				</div>
			</div>
			
			<div className={classNames(css.list)}>
				<div className={classNames(css.border)}>
				
				</div>
				
				<div className={classNames(css.items)}>
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