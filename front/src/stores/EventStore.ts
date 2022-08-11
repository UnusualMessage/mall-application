import {makeObservable, runInAction} from "mobx";

import Store, {storeProps} from "./Store";
import Event from "../api/interfaces/event/Event";
import CreateEvent from "../api/interfaces/event/CreateEvent";
import DeleteEvent from "../api/interfaces/event/DeleteEvent";
import UpdateEvent from "../api/interfaces/event/UpdateEvent";
import EventService from "../api/services/EventService";

class EventStore extends Store<Event, CreateEvent, UpdateEvent, DeleteEvent> {
	constructor() {
		super(new EventService(), []);
		
		makeObservable(this, {
			...storeProps,
		});
	}
	
	public getEventsByShopId = (id: string) => {
		runInAction(async () => {
			await this.getAsync(`shopId=${id}`);
		}).then(_ => _);
		
		return this.data;
	};
}

export default new EventStore();