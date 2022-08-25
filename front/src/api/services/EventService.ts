import Event from "../interfaces/event/Event";
import CreateEvent from "../interfaces/event/CreateEvent";
import UpdateEvent from "../interfaces/event/UpdateEvent";
import Service from "./Service";

class EventService extends Service<Event, CreateEvent, UpdateEvent>{
	constructor() {
		super("/api/events/");
	}
}

export default EventService;