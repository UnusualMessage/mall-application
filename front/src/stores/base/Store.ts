import { action, observable, runInAction, toJS } from "mobx";

import Service from "../../api/services/Service";
import isError from "../../utils/isError";
import Requester, { requesterProps } from "./Requester";

export const storeProps = {
    ...requesterProps,
    data: observable,
    current: observable,

    getByIdAsync: action,
    getAsync: action,
    createAsync: action,
    updateAsync: action,
    deleteAsync: action,
};

interface Model {
    id: string;
}

class Store<T extends Model, CreateT, UpdateT> extends Requester {
    protected service: Service<T, CreateT, UpdateT>;
    protected data: T[];
    protected current: T | undefined;

    constructor(service: Service<T, CreateT, UpdateT>, data: T[]) {
        super();

        this.service = service;
        this.data = data;
        this.current = undefined;
    }

    public get = () => {
        return toJS(this.data);
    };

    public getCurrent = () => {
        return toJS(this.current);
    };

    public getAsync = async (query: string) => {
        const data = await this.service.get(query);

        if (isError(data)) {
            this.invokeError(data.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.data = data;
        });
    };

    public getByIdAsync = async (id: string) => {
        const data = await this.service.getById(id);

        if (isError(data)) {
            this.invokeError(data.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.current = data;
        });

        return this.current;
    };

    public createAsync = async (newData: CreateT, token = "") => {
        const data = await this.service.post(newData, token);

        if (isError(data)) {
            this.invokeError(data.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.data.push(data);
        });
    };

    public updateAsync = async (newData: UpdateT, token = "") => {
        const data = await this.service.put(newData, token);

        if (isError(data)) {
            this.invokeError(data.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.data = this.data.map((item) =>
                item.id === data.id ? data : item
            );
            this.current = data;
        });
    };

    public deleteAsync = async (id: string, token = "") => {
        const data = await this.service.delete(id, token);

        if (isError(data)) {
            this.invokeError(data.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.data = this.data.filter((item) => item.id !== data.id);
        });
    };
}

export default Store;
