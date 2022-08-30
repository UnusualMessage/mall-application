import { action, makeObservable, observable, runInAction, toJS } from "mobx";

import { Contacts, UpdateContacts } from "../api/interfaces/contacts";
import ContactsService from "../api/services/ContactsService";
import isError from "../utils/isError";
import { Requester } from "./base";
import { requesterProps } from "./base/Requester";

const props = {
    ...requesterProps,
    contacts: observable,
    getAsync: action,
    updateAsync: action,
};

class ContactsStore extends Requester {
    private contacts: Contacts | undefined;
    private contactsService: ContactsService;

    constructor() {
        super();

        this.contacts = undefined;
        this.contactsService = new ContactsService();

        makeObservable(this, {
            ...props,
        });
    }

    public get = () => {
        return toJS(this.contacts);
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

    public updateAsync = async (newData: UpdateContacts, token = "") => {
        const data = await this.contactsService.put(newData, token);

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
