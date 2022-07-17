import { makeAutoObservable, runInAction } from "mobx";

import EventService from "../api/services/EventService";
import Event from "../api/interfaces/event/Event";
import NewEvent from "../api/interfaces/event/NewEvent";

class EventStore {
	events: Event[] = [];
	
	eventService: EventService;
	
	status = "";
	
	constructor() {
		this.eventService = new EventService();
		
		makeAutoObservable(this);
	}
	
	get = () => {
		return this.events;
	};
	
	getEventsAsync = async () => {
		try {
			const query = "";
			const data = await this.eventService.get(query);
			
			runInAction(() => {
				this.events = data;
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	createEventAsync = async (newEvent: NewEvent) => {
		try {
			const data = await this.eventService.post(newEvent);
			
			runInAction(() => {
				this.events.push(data);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	updateEventAsync = async (event: Event) => {
		try {
			const data = await this.eventService.put(event);
			
			runInAction(() => {
				this.events = this.events.map(event => event.id === data.id ? data : event);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
	
	deleteEventAsync = async (id: string) => {
		try {
			const data = await this.eventService.delete(id);
			
			runInAction(() => {
				this.events = this.events.filter(event => event.id !== data.id);
			});
			
		} catch(error) {
			runInAction(() => {
				this.status = "error";
			});
		}
	};
}

export default new EventStore();