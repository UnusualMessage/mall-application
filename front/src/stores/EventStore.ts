import {makeObservable} from "mobx";

import { storeProps } from "./base/Store";
import { Store } from "./base";
import { CreateEvent, UpdateEvent, Event } from "../api/interfaces/event/";
import EventService from "../api/services/EventService";

class EventStore extends Store<Event, CreateEvent, UpdateEvent> {
	constructor() {
		super(new EventService(), []);
		
		makeObservable(this, {
			...storeProps,
		});
	}
	
	public getEventsByShopId = async (id: string) => {
		await this.getAsync(`Filters=ShopId==${id}`);
		return this.data;
	};
}

export default new EventStore();