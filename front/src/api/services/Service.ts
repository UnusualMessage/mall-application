import {Error} from "../interfaces/Error";
import resolveResponse from "../../utils/resolveResponse";

class Service<T, CreateT, UpdateT> {
	protected readonly webApiUrl: string;
	
	constructor(webApiUrl: string) {
		this.webApiUrl = webApiUrl;
	}
	
	public get = async (urlParams: string): Promise<T[] | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public getById = async (id: string): Promise<T | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + id, options);
		const response = await fetch(request);
		return resolveResponse(response);
	};
	
	public post = async (model: CreateT): Promise<T | Error> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public put = async (model: UpdateT): Promise<T | Error> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public delete = async (id: string): Promise<T | Error> => {
		const options = {
			method: "DELETE",
		};
		
		const request = new Request(this.webApiUrl + id, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default Service;