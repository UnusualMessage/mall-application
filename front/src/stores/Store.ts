import {action, observable, runInAction, toJS} from "mobx";
import Service from "../api/services/Service";

export const storeProps = {
	data: observable,
	current: observable,
	error: observable,
	successful: observable,
	
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
	
	protected error: string;
	protected successful: boolean;
	
	constructor(service: Service<T, CreateT, UpdateT>, data: T[]) {
		this.service = service;
		this.data = data;
		this.current = undefined;
		
		this.error = "";
		this.successful = true;
	}
	
	protected invokeError = (error: string) => {
		this.error = error;
		this.successful = false;
		console.error(this.error);
	};
	
	public get = () => {
		return toJS(this.data);
	};
	
	public getCurrent = () => {
		return toJS(this.current);
	};

	public isRequestSuccessful = () => {
		return this.successful;
	};
	
	public getAsync = async (query: string) => {
		const data = await this.service.get(query);
		
		runInAction(() => {
			this.data = data;
		});
	};
	
	public getByIdAsync = async (id: string) => {
		const data = await this.service.getById(id);
		
		runInAction(() => {
			this.current = data;
		});
		
		return this.current;
	};
	
	public createAsync = async (newData: CreateT) => {
		const data = await this.service.post(newData);
		
		runInAction(() => {
			this.data.push(data);
		});
	};
	
	public updateAsync = async (newData: UpdateT) => {
		const data = await this.service.put(newData);
		
		runInAction(() => {
			this.data = this.data.map(item => item.id === data.id ? data : item);
			this.current = data;
		});
	};
	
	public deleteAsync = async (id: string) => {
		const data = await this.service.delete(id);
		
		runInAction(() => {
			this.data = this.data.filter(item => item.id !== data.id);
		});
	};
}

export default Store;