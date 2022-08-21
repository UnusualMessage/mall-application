import {Contacts, UpdateContacts} from "../interfaces/contacts";

class ContactsService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/contacts/";
	}
	
	public get = async (): Promise<Contacts> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public put = async (model: UpdateContacts): Promise<Contacts> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return response.json();
	};
}

export default ContactsService;