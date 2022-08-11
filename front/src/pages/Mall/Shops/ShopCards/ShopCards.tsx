import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./shopCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import ShopCard from "../ShopCard";
import Label from "../../../../components/Label";

import ShopStore from "../../../../stores/ShopStore";
import InterfaceStore from "../../../../stores/InterfaceStore";
import toRightForm from "../../../../utils/toRightForm";
import Shop from "../../../../api/interfaces/shop/Shop";

const ShopCards = () => {
	const [shops, setShops] = useState<Shop[]>();
	
	useEffect(() => {
		const getShops = async () => {
			const shops = await ShopStore.getAsync("");
			setShops(shops);
		};
		
		void getShops();
	}, []);
	
	const onFilterSwitch = () => {
		InterfaceStore.switchFilter();
	};
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.moved]: InterfaceStore.isFilterActive()
	});
	
	if (!shops) {
		return null;
	}
	
	return(
		<div className={classes}>
			<div className={classNames(css.pre)}>
				<Label className={classNames(css.switcher, label.mini, label.upper)} text={"Фильтр"} onClick={onFilterSwitch}/>
				
				<div className={classNames(css.container)}>
					<Label className={classNames(label.large)} text={`${shops.length}`}/>
					<Label text={toRightForm(shops.length, [" магазин", " магазина", " магазинов"])}
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