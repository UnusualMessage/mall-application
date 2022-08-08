import {useNavigate} from "react-router-dom";
import {FormEventHandler, useCallback, useState} from "react";
import classNames from "classnames";

import css from "../NewDiscount/discount.module.scss";

import Loader from "../../../components/Loader";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import InterfaceStore from "../../../stores/InterfaceStore";

const NewCategory = () => {
	const redirect = useNavigate();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
	const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
	};
	
	return(
		<>
			{
				InterfaceStore.isLoading()
					?
					<Loader/>
					:
					<form className={classNames(css.wrapper)} onSubmit={handleUpdate}>
						<Input label={"Название категории"}
						       type={"text"}
						       placeholder={"Введите название категории"}
						       defaultValue={""}
						       name={"title"}
						/>
						
						<div className={classNames(css.buttons)}>
							<Button text={"Добавить"} disabled={buttonsDisabled} submit/>
						</div>
					</form>
			}
		</>
	);
};

export default NewCategory;