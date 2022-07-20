import {observer} from "mobx-react-lite";

import css from "./discountCards.module.scss";

import DiscountCard from "../DiscountCard";

import DiscountStore from "../../../../stores/DiscountStore";

const DiscountCards = () => {
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.border}`}/>
			
			<div className={`${css.list}`}>
				{DiscountStore.get().map(discount => {
					return(
						<DiscountCard key={discount.link} image={discount.image} title={discount.title}
						             link={discount.link}/>
					);
				})}
			</div>
		</div>
	);
};

export default observer(DiscountCards);