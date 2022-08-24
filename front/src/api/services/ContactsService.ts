import {Contacts, UpdateContacts} from "../interfaces/contacts";
import resolveResponse from "../../utils/resolveResponse";
import {Error} from "../interfaces/Error";

class ContactsService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/contacts/";
	}
	
	public get = async (): Promise<Contacts | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public put = async (model: UpdateContacts): Promise<Contacts | Error> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default ContactsService;