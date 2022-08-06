import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {MouseEventHandler, useEffect, useState} from "react";
import classNames from "classnames";

import css from "./discount.module.scss";

import Loader from "../../../components/Loader";
import TextEditor from "../../../components/TextEditor/TextEditor";
import Button from "../../../components/Button";

import discounts from "../../../data/discounts";
import DiscountStore from "../../../stores/DiscountStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";
import transliterate from "../../../utils/transliterate";

const Discount = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const discount = discounts.find(discount => discount.link === id);
	
	useEffect(() => {
		if (!discount) {
			redirect("");
		}
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	const lockInterface = () => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	};
	
	const unlockInterface = () => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	};
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		lockInterface();
		await DiscountStore.deleteDiscountAsync({ id: discount.id });
		unlockInterface();
		
		if (DiscountStore.successful) {
			redirect("../");
		}
	};
	
	const handleUpdate: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		if (id) {
			const transliteratedTitle = transliterate(discount.title);
			
			const updateDiscount: UpdateDiscount = {
				id: id,
				title: discount.title,
				image: discount.title,
				description: discount.description,
				route: `discounts/${transliteratedTitle}`,
				link: transliteratedTitle,
				shopId: discount.shop.id
			};
			
			lockInterface();
			await DiscountStore.updateDiscountAsync(updateDiscount);
			unlockInterface();
			
			if (DiscountStore.successful) {
				redirect("../");
			}
		}
	};
	
	return(
		<>
			{
				InterfaceStore.isLoading()
				?
				<Loader/>
				:
				<form className={classNames(css.wrapper)}>
					<select className={css.selection}>
					</select>
					
					<TextEditor className={css.description} readonly={false}
					            defaultValue={"[{\"type\":\"paragraph\",\"align\":\"left\",\"children\":[{\"text\":\"Hello, world\",\"bold\":true,\"italic\":true}]}]"}/>
					
					<div className={classNames(css.buttons)}>
						<Button text={"Изменить"} disabled={buttonsDisabled} onClick={handleUpdate}/>
						<Button text={"Удалить"} disabled={buttonsDisabled} onClick={handleDelete}/>
					</div>
				</form>
			}
		</>
		
	);
};

export default observer(Discount);