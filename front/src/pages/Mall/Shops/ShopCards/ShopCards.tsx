import {observer} from "mobx-react-lite";

import css from "./shopCards.module.scss";
import label from "/src/components/Label/label.module.scss";

import ShopCard from "../ShopCard";

import ShopStore from "../../../../stores/ShopStore";
import Label from "../../../../components/Label";

const ShopCards = () => {
	const toRightForm = (count: number, text_forms: string[]) => {
		count = Math.abs(count) % 100;
		const n1 = count % 10;
		if (count > 10 && count < 20) { return text_forms[2]; }
		if (n1 > 1 && n1 < 5) { return text_forms[1]; }
		if (n1 == 1) { return text_forms[0]; }
		return text_forms[2];
	};
	
	const shopsCount = ShopStore.getCount();
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.pre}`}>
				<div>
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
							<ShopCard key={shop.id} image={shop.image} title={shop.title} link={shop.link}/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default observer(ShopCards);