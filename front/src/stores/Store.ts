import {action, observable, runInAction, toJS} from "mobx";
import Service from "../api/services/Service";

interface Request {
	id: string
}

interface Model {
	id: string
}

export const storeProps = {
	data: observable,
	error: observable,
	successful: observable,
	
	invokeError: action,
	getByIdAsync: action,
	getAsync: action,
	createAsync: action,
	updateAsync: action,
	deleteAsync: action,
};

class Store<T extends Model, CreateT, UpdateT, DeleteT extends Request> {
	protected service: Service<T, CreateT, UpdateT, DeleteT>;
	protected data: T[];
	protected current: T | undefined;
	
	protected error: string;
	protected successful: boolean;
	
	constructor(service: Service<T, CreateT, UpdateT, DeleteT>, data: T[]) {
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
	
	public get() {
		return toJS(this.data);
	}
	
	public getCurrent() {
		return toJS(this.current);
	}
	
	public getCount() {
		return this.data.length;
	}
	
	public isRequestSuccessful() {
		return this.successful;
	}
	
	public getAsync = async (query: string) => {
		try {
			const data = await this.service.get(query);
			
			runInAction(() => {
				this.data = data;
			});
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	public getByIdAsync = async (id: string) => {
		try {
			const data = await this.service.getById(id);
			
			runInAction(() => {
				this.current = data;
			});
		} catch(error) {
			this.invokeError("Request Error");
		}
		
		return this.current;
	};
	
	public createAsync = async (newData: CreateT) => {
		try {
			const data = await this.service.post(newData);
			
			runInAction(() => {
				this.data.push(data);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	public updateAsync = async (newData: UpdateT) => {
		try {
			const data = await this.service.put(newData);
			
			runInAction(() => {
				this.data = this.data.map(item => item.id === data.id ? data : item);
				this.current = data;
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
	
	public deleteAsync = async (id: DeleteT) => {
		try {
			const data = await this.service.delete(id);
			
			runInAction(() => {
				this.data = this.data.filter(item => item.id !== data.id);
			});
			
		} catch(error: any) {
			console.log(error.message);
			this.invokeError("Request Error");
		}
	};
}

export default Store;