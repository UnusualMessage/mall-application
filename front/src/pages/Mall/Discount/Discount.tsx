import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

import css from "./discount.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../components/Image";
import Label from "../../../components/Label";
import {OuterLink} from "../../../components/Link";

import discounts from "../../../data/discounts";
import {HomeRoute} from "../../../data/routes";

const Discount = () => {
	const { discountId } = useParams();
	const redirect = useNavigate();
	
	const discount = discounts.find(discount => discount.link === discountId);
	
	if (!discount) {
		redirect(HomeRoute.route);
		return null;
	}
	
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.info}`}>
				<Image classes={`${css.image}`} source={discount.image}/>
				
				<div className={`${css.contacts}`}>
					<Label className={`${label.big}`} text={discount.title}/>
					<Label className={`${label.big}`} text={discount.title}/>
					<Label className={`${label.big}`} text={discount.title}/>
					<Label className={`${label.big}`} text={discount.title}/>
					
					<OuterLink className={""} to={`https://${discount.title}`}>
						<Label text={discount.title} className={`${label.big} ${label.hovered}`}/>
					</OuterLink>
				</div>
			</div>
			
			<div className={`${css.description}`}>
				<Label text={discount.title} className={""}/>
			</div>
		</div>
	);
};

export default observer(Discount);