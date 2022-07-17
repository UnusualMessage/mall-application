import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

import css from "./discount.module.scss";
import label from "../../../components/common/Label/label.module.scss";

import Image from "../../../components/common/Image";
import Label from "../../../components/common/Label";
import Outer from "../../../components/common/Outer";

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
					<Label text={`${discount.title}-й этаж`} classes={`${label.big}`}/>
					<Label text={`${discount.title}`} classes={`${label.big}`}/>
					<Label text={`${discount.title}`} classes={`${label.big}`}/>
					
					<Outer classes={""} to={`https://${discount.title}`}>
						<Label text={`${discount.title}`} classes={`${label.big} ${label.hovered}`}/>
					</Outer>
				</div>
			</div>
			
			<div className={`${css.description}`}>
				<Label text={discount.title} classes={""}/>
				<Label text={discount.title} classes={""}/>
				<Label text={discount.title} classes={""}/>
			</div>
		</div>
	);
};

export default observer(Discount);