import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./eventCards.module.scss";

import EventCard from "../EventCard";

import EventStore from "../../../../stores/EventStore";
import Event from "../../../../api/interfaces/event/Event";

const EventCards = () => {
	const [events, setEvents] = useState<Event[]>();
	
	useEffect(() => {
		const getEvents = async () => {
			const events = await EventStore.getAsync("");
			setEvents(events);
		};
		
		void getEvents();
	}, []);
	
	if (!events) {
		return null;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.border)}>
			
			</div>
			
			<div className={classNames(css.items)}>
				{events.map(event => {
					return(
						<EventCard key={event.id} event={event}/>
					);
				})}
			</div>
		</div>
	);
};

export default EventCards;