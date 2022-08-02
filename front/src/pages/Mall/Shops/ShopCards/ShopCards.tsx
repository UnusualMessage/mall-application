import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./shopCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import ShopCard from "../ShopCard";
import Label from "../../../../components/Label";

import ShopStore from "../../../../stores/ShopStore";
import InterfaceStore from "../../../../stores/InterfaceStore";
import toRightForm from "../../../../utils/toRightForm";

const ShopCards = () => {
	const shopsCount = ShopStore.getCount();
	
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
				<Label className={classNames(css.switcher, label.mini, label.upper)} text={"Фильтр"} onClick={onFilterSwitch}/>
				
				<div className={classNames(css.container)}>
					<Label className={classNames(label.large)} text={`${shopsCount}`}/>
					<Label text={toRightForm(shopsCount, [" магазин", " магазина", " магазинов"])}
					       className={classNames(label.default, label.big)}/>
				</div>
			</div>
			
			<div className={classNames(css.list)}>
				<div className={classNames(css.border)}>
				
				</div>
				
				<div className={classNames(css.items)}>
					{ShopStore.getFiltered().map(shop => {
						return(
							<ShopCard key={shop.id} shop={shop}/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default observer(ShopCards);