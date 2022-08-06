import {useNavigate, useParams} from "react-router-dom";
import {MouseEventHandler, useCallback, useEffect, useState} from "react";
import classNames from "classnames";

import css from "./event.module.scss";

import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import TextEditor from "../../../components/TextEditor/TextEditor";

import events from "../../../data/events";
import InterfaceStore from "../../../stores/InterfaceStore";
import transliterate from "../../../utils/transliterate";
import UpdateDiscount from "../../../api/interfaces/discount/UpdateDiscount";
import EventStore from "../../../stores/EventStore";

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
		await EventStore.deleteEventAsync({ id: event.id });
		unlockInterface();
		
		if (EventStore.successful) {
			redirect("../");
		}
	};
	
	const handleUpdate: MouseEventHandler = async (e) => {
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
			await EventStore.updateEventAsync(updateDiscount);
			unlockInterface();
			
			if (EventStore.successful) {
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

export default Event;