import {useNavigate, useParams} from "react-router-dom";
import {FormEventHandler, MouseEventHandler, useCallback, useEffect, useState} from "react";
import classNames from "classnames";

import css from "./event.module.scss";

import Loader from "../../../components/Loader";
import Button from "../../../components/Button";

import events from "../../../data/events";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";
import EventStore from "../../../stores/EventStore";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import shops from "../../../data/shops";

const Event = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const event = events.find(event => event.link === id);
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
	useEffect(() => {
		if (!event) {
			redirect("");
		}
	}, [event]);
	
	if (!event) {
		return null;
	}
	
	const handleDelete: MouseEventHandler = async (e) => {
		e.preventDefault();
		
		lockInterface();
		await EventStore.deleteAsync({ id: event.id });
		unlockInterface();
		
		if (EventStore.isRequestSuccessful()) {
			redirect("../");
		}
	};
	
	const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		
		if (id) {
			const transliteratedTitle = transliterate(event.title);
			
			const updateDiscount: UpdateDiscount = {
				id: id,
				title: event.title,
				image: event.title,
				description: event.description,
				route: `events/${transliteratedTitle}`,
				link: transliteratedTitle,
				shopId: event.shop.id
			};
			
			lockInterface();
			await EventStore.updateAsync(updateDiscount);
			unlockInterface();
			
			if (EventStore.isRequestSuccessful()) {
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
						       defaultValue={event.title}
						       name={"title"}
						/>
						
						<Select values={shops} label={"Выберите магазин"} defaultValue={event.shop.id}/>
						
						<Input label={"Текст статьи"}
						       type={"text"}
						       placeholder={"Введите текст статьи"}
						       defaultValue={event.description}
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

export default Event;