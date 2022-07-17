import Event from "../interfaces/event/Event";
import NewEvent from "../interfaces/event/NewEvent";

const webApiUrl = "https://localhost:44333/api/events/";

class EventService {
	
	get = async (urlParams: string): Promise<Event[]> => {
		const options = {
			method: "GET",
		};
		const request = new Request(webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		return response.json();
	};
	
	post = async (model: NewEvent): Promise<Event> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(webApiUrl, options);
		const response = await fetch(request);
		return response.json();
	};
	
	put = async (model: Event): Promise<Event> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(webApiUrl, options);
		const response = await fetch(request);
		return response.json();
	};
	
	delete = async (id: string): Promise<Event> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "DELETE",
			headers
		};
		const request = new Request(webApiUrl + "/" + id, options);
		const response = await fetch(request);
		return response.json();
	};
}

export default EventService;