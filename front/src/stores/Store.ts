import {action, observable, runInAction, toJS} from "mobx";
import Service from "../api/services/Service";
import RequestInfo from "../api/interfaces/RequestInfo";
import isError from "../utils/isError";

export const storeProps = {
	data: observable,
	current: observable,
	lastRequest: observable,
	
	invokeError: action,
	getByIdAsync: action,
	getAsync: action,
	createAsync: action,
	updateAsync: action,
	deleteAsync: action,
};

interface Model {
	id: string
}

class Store<T extends Model, CreateT, UpdateT> {
	protected service: Service<T, CreateT, UpdateT>;
	protected data: T[];
	protected current: T | undefined;
	
	protected lastRequest: RequestInfo;
	
	constructor(service: Service<T, CreateT, UpdateT>, data: T[]) {
		this.service = service;
		this.data = data;
		this.current = undefined;
		
		this.lastRequest = {
			message: "",
			successful: true
		};
	}
	
	protected invokeError = (error: string) => {
		this.lastRequest = {
			message: error,
			successful: false
		};
	};
	
	protected invokeSuccess = () => {
		this.lastRequest = {
			message: "",
			successful: true
		};
	};
	
	public get = () => {
		return toJS(this.data);
	};
	
	public getCurrent = () => {
		return toJS(this.current);
	};

	public isRequestSuccessful = () => {
		return this.lastRequest.successful;
	};
	
	public getErrorMessage = () => {
		return this.lastRequest.message;
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
	
	public createAsync = async (newData: CreateT) => {
		const data = await this.service.post(newData);
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.data.push(data);
		});
	};
	
	public updateAsync = async (newData: UpdateT) => {
		const data = await this.service.put(newData);
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.data = this.data.map(item => item.id === data.id ? data : item);
			this.current = data;
		});
	};
	
	public deleteAsync = async (id: string) => {
		const data = await this.service.delete(id);
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.data = this.data.filter(item => item.id !== data.id);
		});
	};
}

export default Store;