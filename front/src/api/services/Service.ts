class Service<T, CreateT, UpdateT> {
	protected readonly webApiUrl: string;
	
	constructor(webApiUrl: string) {
		this.webApiUrl = webApiUrl;
	}
	
	public get = async (urlParams: string): Promise<T[]> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public getById = async (id: string): Promise<T> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + id, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public post = async (model: CreateT): Promise<T> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public put = async (model: UpdateT): Promise<T> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "PUT",
			headers,
			body: JSON.stringify(model)
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public delete = async (id: string): Promise<T> => {
		const options = {
			method: "DELETE",
		};
		
		const request = new Request(this.webApiUrl + id, options);
		const response = await fetch(request);
		
		return response.json();
	};
}

export default Service;