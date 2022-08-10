import {makeObservable} from "mobx";

import Store, {storeProps} from "./Store";
import Event from "../api/interfaces/event/Event";
import events from "../data/events";
import CreateEvent from "../api/interfaces/event/CreateEvent";
import DeleteEvent from "../api/interfaces/event/DeleteEvent";
import UpdateEvent from "../api/interfaces/event/UpdateEvent";
import EventService from "../api/services/EventService";

class EventStore extends Store<Event, CreateEvent, UpdateEvent, DeleteEvent> {
	constructor() {
		super(new EventService(), events);
		
		makeObservable(this, {
			...storeProps,
		});
	}
	
	public getEventsByShopId = (id: string) => {
		return this.data.filter(discount => discount.shop.id === id);
	};
}

export default new EventStore();