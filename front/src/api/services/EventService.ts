import Event from "../interfaces/event/Event";
import CreateEvent from "../interfaces/event/CreateEvent";
import UpdateEvent from "../interfaces/event/UpdateEvent";
import Service from "./Service";
import DeleteEvent from "../interfaces/event/DeleteEvent";

class EventService extends Service<Event, CreateEvent, UpdateEvent, DeleteEvent>{
	constructor() {
		super("https://localhost:44333/api/events/");
	}
}

export default EventService;