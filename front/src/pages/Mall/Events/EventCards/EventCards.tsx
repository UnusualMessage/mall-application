import classNames from "classnames";

import css from "./eventCards.module.scss";

import EventCard from "../EventCard";

import EventStore from "../../../../stores/EventStore";

const EventCards = () => {
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.border)}>
			
			</div>
			
			<div className={classNames(css.items)}>
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