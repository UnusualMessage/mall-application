import css from "./shopCard.module.scss";
import label from "../../../../components/common/Label/label.module.scss";

import Inner from "../../../../components/common/Inner";
import Label from "../../../../components/common/Label";
import Image from "../../../../components/common/Image";

const ShopCard = ({ image, title, link }: Props) => {
	return(
		<Inner classes={`${css.wrapper}`} to={link}>
			<Image classes={`${css.logo}`} source={image}/>
			<Label classes={`${css.title} ${label.bold}`} text={title}/>
			
			<div className={`${css.more}`}>
				<div className={`${css.info}`}>
					<Label classes={`${label.mini}`} text={"8 800 200-95-55"}/>
					<Label classes={`${label.mini}`} text={"www.perekrestok.ru"}/>
				</div>
				
				<Label text={"1-й этаж"} classes={`${css.floor} ${label.mini}`}/>
			</div>
		</Inner>
	);
};

interface Props {
	image: string,
	title: string,
	link: string
}

export default ShopCard;