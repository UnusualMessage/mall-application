import {action, observable, runInAction} from "mobx";
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
	getAsync: action,
	createAsync: action,
	updateAsync: action,
	deleteAsync: action,
};

class Store<T extends Model, CreateT, UpdateT, DeleteT extends Request> {
	protected service: Service<T, CreateT, UpdateT, DeleteT>;
	protected data: T[];
	
	protected error: string;
	protected successful: boolean;
	
	constructor(service: Service<T, CreateT, UpdateT, DeleteT>, data: T[]) {
		this.service = service;
		this.data = data;
		
		this.error = "";
		this.successful = true;
	}
	
	protected invokeError = (error: string) => {
		this.error = error;
		this.successful = false;
		console.error(this.error);
	};
	
	public get() {
		return this.data;
	}
	
	public getCount() {
		return this.data.length;
	}
	
	public isRequestSuccessful() {
		return this.successful;
	}
	
	public getAsync = async () => {
		try {
			const query = "";
			const data = await this.service.get(query);
			
			runInAction(() => {
				this.data = data;
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
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
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
}

export default Store;