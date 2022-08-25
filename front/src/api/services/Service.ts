import {Error} from "../interfaces/fetch";
import {get, post, put, remove} from "./requests";

class Service<T, CreateT, UpdateT> {
	protected readonly url: string;
	
	constructor(url: string) {
		this.url = url;
	}
	
	public get = async (query: string): Promise<T[] | Error> => {
		return await get(this.url, "", query);
	};
	
	public getById = async (id: string): Promise<T | Error> => {
		return await get(this.url, id, "");
	};
	
	public post = async (model: CreateT): Promise<T | Error> => {
		return await post(model, this.url, "", "");
	};
	
	public put = async (model: UpdateT): Promise<T | Error> => {
		return await put(model, this.url, "", "");
	};
	
	public delete = async (id: string): Promise<T | Error> => {
		return await remove(this.url, id, "");
	};
}

export default Service;