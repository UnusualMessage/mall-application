import Image from "../interfaces/image/Image";
import CreateImage from "../interfaces/image/CreateImage";
import {Error} from "../interfaces/Error";
import resolveResponse from "../../utils/resolveResponse";

class ImageService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "https://localhost:44328/api/images/";
	}
	
	public get = async (urlParams: string): Promise<Image[] | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public post = async (model: CreateImage): Promise<Image | Error> => {
		const formData = new FormData();
		
		formData.append("image", model.image);
		
		const options = {
			method: "POST",
			body: formData
		};
		
		const request = new Request(this.webApiUrl, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public delete = async (id: string): Promise<Image | Error> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		const options = {
			method: "DELETE",
			headers
		};
		
		const request = new Request(this.webApiUrl + id, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default ImageService;