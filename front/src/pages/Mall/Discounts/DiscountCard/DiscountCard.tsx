import css from "./discountCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

const DiscountCard = ({ image, title, link }: Props) => {
	return(
		<InnerLink className={`${css.wrapper}`} to={link}>
			<Image classes={`${css.logo}`} source={image}/>
			<Label text={title} className={`${css.title} ${label.default} ${label.bold}`}/>
			
			<div className={`${css.more}`}>
				<div className={`${css.info}`}>
					<Label text={"8 800 200-95-55"} className={`${label.mini}`}/>
					<Label text={"www.perekrestok.ru"} className={`${label.mini}`}/>
				</div>
				
				<Label text={"1-й этаж"} className={`${css.floor} ${label.mini}`}/>
			</div>
		</InnerLink>
	);
};

interface Props {
	image: string,
	title: string,
	link: string
}

export default DiscountCard;