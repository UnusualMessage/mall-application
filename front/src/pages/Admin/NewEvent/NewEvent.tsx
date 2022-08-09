import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import css from "./event.module.scss";

import Select from "../../../components/Select";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";

import InterfaceStore from "../../../stores/InterfaceStore";
import Input from "../../../components/Input";
import shops from "../../../data/shops";
import {FormEventHandler, useCallback, useState} from "react";

const NewEvent = () => {
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

	const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
	};
	
	return(
		<>
			{
				InterfaceStore.isLoading()
					?
					<Loader/>
					:
					<form className={classNames(css.wrapper)} onSubmit={handleDelete}>
						<Input label={"Название"}
						       type={"text"}
						       placeholder={"Введите заголовок статьи"}
						       defaultValue={""}
						       name={"title"}
						/>
						
						<Select values={shops} label={"Выберите магазин"} defaultValue={"1"}/>
						
						<Input label={"Текст статьи"}
						       type={"text"}
						       placeholder={"Введите текст статьи"}
						       defaultValue={""}
						       name={"description"}
						/>
						
						<div className={classNames(css.buttons)}>
							<Button text={"Добавить"} disabled={buttonsDisabled} submit/>
						</div>
					</form>
			}
		</>
	);
};

export default observer(NewEvent);