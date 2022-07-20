import {observer} from "mobx-react-lite";

import css from "./shopCards.module.scss";

import ShopCard from "../ShopCard";

import ShopStore from "../../../../stores/ShopStore";

const ShopCards = () => {
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.border}`}>
			
			</div>
			
			<div className={`${css.list}`}>
				{ShopStore.get().map(shop => {
					return(
						<ShopCard key={shop.id} image={shop.image} title={shop.title} link={shop.link}/>
					);
				})}
			</div>
		</div>
	);
};

export default observer(ShopCards);