import {observer} from "mobx-react-lite";

import css from "./shopCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import ShopCard from "../ShopCard";
import Label from "../../../../components/Label";

import ShopStore from "../../../../stores/ShopStore";
import toRightForm from "../../../../utils/toRightForm";
import InterfaceStore from "../../../../stores/InterfaceStore";

const ShopCards = () => {
	const shopsCount = ShopStore.getCount();
	
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
				
				<div className={`${css.container}`}>
					<Label text={`${shopsCount}`} className={`${label.large}`}/>
					<Label text={toRightForm(shopsCount, [" магазин", " магазина", " магазинов"])}
					       className={`${label.default} ${label.big}`}/>
				</div>
			</div>
			
			<div className={`${css.list}`}>
				<div className={`${css.border}`}>
				
				</div>
				
				<div className={`${css.items}`}>
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