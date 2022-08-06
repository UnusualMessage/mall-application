import Event from "../interfaces/event/Event";
import CreateEvent from "../interfaces/event/CreateEvent";
import UpdateEvent from "../interfaces/event/UpdateEvent";
import DeleteDiscount from "../interfaces/discount/DeleteDiscount";

const webApiUrl = "https://localhost:44333/api/events/";

class EventService {
	
	get = async (urlParams: string): Promise<Event[]> => {
		const options = {
			method: "GET",
		};
		
		try {
			const request = new Request(webApiUrl + "?" + urlParams, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
	
	post = async (model: CreateEvent): Promise<Event> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		try {
			const request = new Request(webApiUrl, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
	
	put = async (model: UpdateEvent): Promise<Event> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		try {
			const request = new Request(webApiUrl, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
	
	delete = async (model: DeleteDiscount): Promise<Event> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "DELETE",
			headers
		};
		
		try {
			const request = new Request(webApiUrl + "/" + model.id, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
}

export default EventService;