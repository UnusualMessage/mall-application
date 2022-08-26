import {observer} from "mobx-react-lite";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {Typography} from "antd";

import css from "./index.module.scss";
import label from "/src/components/Label/label.module.scss";

import ShopCard from "../ShopCard";
import Label from "../../../../components/Label";
import Loader from "../../../../components/Loader";

import ShopStore from "../../../../stores/ShopStore";
import InterfaceStore from "../../../../stores/InterfaceStore";
import toRightForm from "../../../../utils/toRightForm";

const ShopCards = () => {
	const [isFetching, setIsFetching] = useState(true);
	const shops = ShopStore.get();
	
	useEffect(() => {
		const getShops = async () => {
			await ShopStore.getAsync("");
			setIsFetching(false);
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
	
	if (isFetching) {
		return <Loader/>;
	}
	
	return(
		<div className={classes}>
			<div className={classNames(css.pre)}>
				<Label className={classNames(css.switcher, label.mini, label.upper)} text={"Фильтр"} onClick={onFilterSwitch}/>
				
				<div className={classNames(css.container)}>
					<Typography.Title level={3}>
						{shops.length}
					</Typography.Title>
					
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