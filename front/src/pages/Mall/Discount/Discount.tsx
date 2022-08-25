import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import classNames from "classnames";

import css from "../Article/article.module.scss";
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
import TextEditor from "../../../components/TextEditor";
import {SocialType} from "../../../types/Social";
import {
	EnvironmentOutlined,
	FieldTimeOutlined,
	LaptopOutlined,
	MessageOutlined,
	PhoneOutlined
} from "@ant-design/icons";

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
			<div className={classNames(css.content)}>
				<div className={classNames(css.info)}>
					<InnerLink className={classNames(css.image)} to={discount.shop.routePath}>
						<Image classes={classNames()} source={discount.shop.image.path}/>
					</InnerLink>
					
					<div className={`${css.contacts}`}>
						<div className={css.contact}>
							<EnvironmentOutlined className={css.pre}/>
							<Label className={classNames(label.big)} text={`${discount.shop.floor}-й этаж`} />
						</div>
						
						<div className={css.contact}>
							<FieldTimeOutlined className={css.pre}/>
							<Label className={classNames(label.big)} text={discount.shop.schedule}/>
						</div>
						
						<div className={css.contact}>
							<PhoneOutlined className={css.pre}/>
							<Label className={classNames(label.big)} text={discount.shop.phone}/>
						</div>
						
						<div className={css.contact}>
							<LaptopOutlined className={css.pre}/>
							
							<OuterLink className={classNames(link.hovered)} to={`https://${discount.shop.site}`}>
								<Label className={classNames(label.big, label.hovered)} text={discount.shop.site}/>
							</OuterLink>
						</div>
						
						<div className={css.contact}>
							<MessageOutlined className={css.pre}/>
							<div className={classNames(css.socials)}>
								{
									discount.shop.socials.map(social => {
										if (social.site) {
											return (
												<OuterLink className={classNames(link.hovered)}
												           to={`https://${social.site}`}
												           key={social.id}>
													
													<Icon className={classNames()}
													      viewBox={social.name === "odnoklassniki" ? "0 0 95.481 95.481" : "0 0 20 20"}
													      icon={icons[social.name as SocialType]}/>
												
												</OuterLink>
											);
										}
										
										return;
									})
								}
							</div>
						</div>
					</div>
				</div>
				
				<Hider className={classNames(css.description)} defaultHeight={250}>
					<TextEditor readonly text={discount.description}/>
				</Hider>
			</div>
		</div>
	);
};

export default observer(Discount);