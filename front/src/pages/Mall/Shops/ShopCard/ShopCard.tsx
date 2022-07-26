import css from "./shopCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";
import Shop from "../../../../api/interfaces/shop/Shop";

const ShopCard = ({ shop }: Props) => {
	return(
		<InnerLink className={`${css.wrapper}`} to={shop.link}>
			<Image classes={`${css.logo}`} source={shop.image}/>
			<Label text={shop.title} className={`${css.title} ${label.default} ${label.bold}`}/>

			<div className={`${css.more}`}>
				<div className={`${css.info}`}>
					<Label text={shop.phone} className={`${label.mini}`}/>
					<Label text={shop.site} className={`${label.mini}`}/>
				</div>
				
				<Label text={`${shop.floor}-й этаж`} className={`${css.floor} ${label.mini}`}/>
			</div>
		</InnerLink>
	);
};

interface Props {
	shop: Shop
}

export default ShopCard;