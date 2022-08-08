import {useNavigate, useParams} from "react-router-dom";
import {FormEventHandler, MouseEventHandler, useCallback, useEffect, useState} from "react";
import classNames from "classnames";

import css from "./category.module.scss";

import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import categories from "../../../data/categories";

const Category = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const category = categories.find(category => category.id === id);
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
	useEffect(() => {
		if (!category) {
			redirect("");
		}
	}, [category]);
	
	if (!category) {
		return null;
	}
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
	};
	
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
						       defaultValue={category.title}
						       name={"title"}
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

export default Category;