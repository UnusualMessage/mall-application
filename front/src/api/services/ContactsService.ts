import {Contacts, UpdateContacts} from "../interfaces/contacts";
import {Error} from "../interfaces/fetch";
import { get, put } from "./requests";

class ContactsService {
	protected readonly url: string;
	
	constructor() {
		this.url = "/api/contacts";
	}
	
	public get = async (): Promise<Contacts | Error> => {
		return await get(this.url, "", "");
	};
	
	public put = async (model: UpdateContacts, token = ""): Promise<Contacts | Error> => {
		return await put(model, this.url, "", "", token);
	};
}

export default ContactsService;