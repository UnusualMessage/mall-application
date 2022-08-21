import {makeAutoObservable, runInAction, toJS} from "mobx";

import {Contacts, UpdateContacts} from "../api/interfaces/contacts";
import ContactsService from "../api/services/ContactsService";

class ContactsStore {
	private contacts: Contacts | undefined;
	private contactsService: ContactsService;
	
	constructor() {
		this.contacts = undefined;
		this.contactsService = new ContactsService();
		
		makeAutoObservable(this);
	}
	
	public get = () => {
		return toJS(this.contacts);
	};
	
	public getAsync = async () => {
		const data = await this.contactsService.get();
		
		runInAction(() => {
			this.contacts = data;
		});
		
		return this.contacts;
	};
	
	public updateAsync = async (newData: UpdateContacts) => {
		const data = await this.contactsService.put(newData);
		
		runInAction(() => {
			this.contacts = data;
		});
		
		return this.contacts;
	};
}

export default new ContactsStore();