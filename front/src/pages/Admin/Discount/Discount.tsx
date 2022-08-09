import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {FormEventHandler, MouseEventHandler, useCallback, useEffect, useState} from "react";
import classNames from "classnames";

import css from "./discount.module.scss";

import Loader from "../../../components/Loader";
import Button from "../../../components/Button";

import discounts from "../../../data/discounts";
import DiscountStore from "../../../stores/DiscountStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";
import transliterate from "../../../utils/transliterate";
import Select from "../../../components/Select";
import shops from "../../../data/shops";
import Input from "../../../components/Input";

const Discount = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const discount = discounts.find(discount => discount.link === id);
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
	useEffect(() => {
		if (!discount) {
			redirect("");
		}
	}, [discount]);
	
	if (!discount) {
		return null;
	}
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		lockInterface();
		await DiscountStore.deleteAsync({ id: discount.id });
		unlockInterface();
		
		if (DiscountStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
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
			await DiscountStore.updateAsync(updateDiscount);
			unlockInterface();
			
			if (DiscountStore.isRequestSuccessful()) {
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
				<form className={classNames(css.wrapper)} onSubmit={handleUpdate}>
					<Input label={"Название"}
					       type={"text"}
					       placeholder={"Введите заголовок статьи"}
					       defaultValue={discount.title}
					       name={"title"}
					/>
					
					<Select values={shops} label={"Выберите магазин"} defaultValue={discount.shop.id}/>
					
					<Input label={"Текст статьи"}
					       type={"text"}
					       placeholder={"Введите текст статьи"}
					       defaultValue={discount.description}
					       name={"description"}
					/>
					
					<div className={classNames(css.buttons)}>
						<Button text={"Изменить"} disabled={buttonsDisabled} submit/>
						<Button text={"Удалить"} disabled={buttonsDisabled} onClick={handleDelete}/>
					</div>
				</form>
			}
		</>
		
	);
};

export default observer(Discount);