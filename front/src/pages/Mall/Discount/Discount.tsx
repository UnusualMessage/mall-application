import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import classNames from "classnames";

import css from "./discount.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../components/Image";
import Label from "../../../components/Label";
import {InnerLink, OuterLink} from "../../../components/Link";
import Icon from "../../../components/Icon";
import Hider from "../../../components/Hider";
import Loader from "../../../components/Loader";

import icons from "../../../data/icons";
import DiscountStore from "../../../stores/DiscountStore";
import TextEditor from "../../../components/TextEditor/TextEditor";

const Discount = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [isFetching, setIsFetching] = useState(true);
	
	const discount = DiscountStore.getCurrent();
	
	useEffect(() => {
		const getDiscount = async () => {
			await DiscountStore.getByIdAsync(id ?? "");
			const discount = DiscountStore.getCurrent();
			
			setIsFetching(false);
			
			if (!discount) {
				redirect("/");
			}
		};
		
		void getDiscount();
	}, [id]);
	
	if (!discount || isFetching) {
		return <Loader/>;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.info)}>
				<InnerLink className={classNames(css.image)} to={discount.shop.routePath}>
					<Image classes={classNames()} source={discount.shop.image.path}/>
				</InnerLink>
				
				<div className={classNames(css.contacts)}>
					<Label className={classNames(label.big)} text={`${discount.shop.floor}-й этаж`} />
					<Label className={classNames(label.big)} text={discount.shop.schedule} />
					<Label className={classNames(label.big)} text={discount.shop.phone} />
					
					<OuterLink className={classNames(link.hovered)} to={`https://${discount.shop.site}`}>
						<Label className={classNames(label.big, label.hovered)} text={discount.shop.site} />
					</OuterLink>
					
					<div className={classNames(css.socials)}>
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
						<OuterLink className={classNames(link.hovered)} to={"https://vk.com"}>
							<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.vk}/>
						</OuterLink>
					</div>
				</div>
			</div>
			
			<Hider className={classNames(css.description)} defaultHeight={230}>
				<TextEditor readonly text={discount.description}/>
			</Hider>
		</div>
	);
};

export default observer(Discount);