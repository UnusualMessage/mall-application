import {makeAutoObservable, runInAction} from "mobx";

import events from "../data/events";
import Store from "../types/Store";
import UpdateEvent from "../api/interfaces/event/UpdateEvent";
import DeleteEvent from "../api/interfaces/event/DeleteEvent";
import CreateEvent from "../api/interfaces/event/CreateEvent";
import Event from "../api/interfaces/event/Event";
import EventService from "../api/services/EventService";

class EventStore implements Store {
	events: Event[] = [];
	
	eventService: EventService;
	
	error: string;
	successful: boolean;
	
	constructor() {
		this.eventService = new EventService();
		this.events = events;
		
		this.error = "";
		this.successful = true;
		
		makeAutoObservable(this);
	}
	
	get = () => {
		return this.events;
	};
	
	getEventsByShopId = (id: string) => {
		return this.events.filter(event => event.shop.id === id);
	};
	
	invokeError = (error: string) => {
		this.error = error;
		this.successful = false;
		console.error(this.error);
	};
	
	getEventsAsync = async () => {
		try {
			const query = "";
			const data = await this.eventService.get(query);
			
			runInAction(() => {
				this.events = data;
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	createEventAsync = async (newEvent: CreateEvent) => {
		try {
			const data = await this.eventService.post(newEvent);
			
			runInAction(() => {
				this.events.push(data);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	updateEventAsync = async (event: UpdateEvent) => {
		try {
			const data = await this.eventService.put(event);
			
			runInAction(() => {
				this.events = this.events.map(event => event.id === data.id ? data : event);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	deleteEventAsync = async (event: DeleteEvent) => {
		try {
			const data = await this.eventService.delete(event);
			
			runInAction(() => {
				this.events = this.events.filter(event => event.id !== data.id);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
}

export default new EventStore();