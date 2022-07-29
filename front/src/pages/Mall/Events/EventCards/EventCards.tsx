import css from "./eventCards.module.scss";

import EventCard from "../EventCard";

import EventStore from "../../../../stores/EventStore";

const EventCards = () => {
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.border}`}>
			
			</div>
			
			<div className={`${css.items}`}>
				{EventStore.get().map(event => {
					return(
						<EventCard key={event.id} event={event}/>
					);
				})}
			</div>
		</div>
	);
};

export default EventCards;