import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./discountCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";
import DiscountCard from "../DiscountCard";
import Loader from "../../../../components/Loader";

import DiscountStore from "../../../../stores/DiscountStore";
import InterfaceStore from "../../../../stores/InterfaceStore";
import toRightForm from "../../../../utils/toRightForm";

const DiscountCards = () => {
	const [isFetching, setIsFetching] = useState(true);
	const discounts = DiscountStore.get();
	
	useEffect(() => {
		const getDiscounts = async () => {
			await DiscountStore.getAsync("");
			setIsFetching(false);
		};
		
		void getDiscounts();
	}, []);
	
	if (isFetching) {
		return <Loader/>;
	}
	
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
					<Label className={classNames(label.large)} text={`${discounts.length}`}/>
					<Label text={toRightForm(discounts.length, [" акция", " акции", " акций"])}
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