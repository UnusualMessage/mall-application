import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./eventCards.module.scss";

import EventCard from "../EventCard";

import EventStore from "../../../../stores/EventStore";

const EventCards = () => {
	const [isFetching, setIsFetching] = useState(true);
	const events = EventStore.get();
	
	useEffect(() => {
		const getEvents = async () => {
			await EventStore.getAsync("");
		};
		
		void getEvents();
		setIsFetching(false);
	}, []);
	
	if (isFetching) {
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