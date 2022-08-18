import Image from "../interfaces/image/Image";
import CreateImage from "../interfaces/image/CreateImage";

class ImageService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/images/";
	}
	
	public get = async (urlParams: string): Promise<Image[]> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public post = async (model: CreateImage): Promise<Image> => {
		const formData = new FormData();
		
		formData.append("image", model.image);
		
		const options = {
			method: "POST",
			body: formData
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return response.json();
	};
	
	public delete = async (id: string): Promise<Image> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "DELETE",
			headers
		};
		
		const request = new Request(this.webApiUrl + id, options);
		const response = await fetch(request);
		
		return response.json();
	};
}

export default ImageService;