import {makeAutoObservable, runInAction, toJS} from "mobx";

import {Contacts, UpdateContacts} from "../api/interfaces/contacts";
import ContactsService from "../api/services/ContactsService";
import RequestInfo from "../api/interfaces/Response";
import isError from "../utils/isError";

class ContactsStore {
	private contacts: Contacts | undefined;
	private contactsService: ContactsService;
	private lastRequest: RequestInfo;
	
	constructor() {
		this.contacts = undefined;
		this.contactsService = new ContactsService();
		
		this.lastRequest = {
			message: "",
			successful: true
		};
		
		makeAutoObservable(this);
	}
	
	public get = () => {
		return toJS(this.contacts);
	};
	
	protected invokeSuccess = () => {
		this.lastRequest = {
			message: "",
			successful: true
		};
	};
	
	private invokeError = (error: string) => {
		this.lastRequest = {
			message: error,
			successful: false
		};
	};
	
	public isRequestSuccessful = () => {
		return this.lastRequest.successful;
	};
	
	public getErrorMessage = () => {
		return this.lastRequest.message;
	};
	
	public getAsync = async () => {
		const data = await this.contactsService.get();
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.contacts = data;
		});
		
		return this.contacts;
	};
	
	public updateAsync = async (newData: UpdateContacts) => {
		const data = await this.contactsService.put(newData);
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.contacts = data;
		});
		
		return this.contacts;
	};
}

export default new ContactsStore();