import Image from "../interfaces/image/Image";
import CreateImage from "../interfaces/image/CreateImage";
import DeleteImage from "../interfaces/image/DeleteImage";

class ImageService {
	protected readonly webApiUrl: string;
	
	constructor(webApiUrl: string) {
		this.webApiUrl = webApiUrl;
	}
	
	public get = async (urlParams: string): Promise<Image[]> => {
		const options = {
			method: "GET",
		};
		
		try {
			const request = new Request(this.webApiUrl + "?" + urlParams, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
	
	public post = async (model: CreateImage): Promise<Image> => {
		const formData = new FormData();
		
		formData.append("image", model.image);
		
		const options = {
			method: "POST",
			body: formData
		};
		
		try {
			const request = new Request(this.webApiUrl, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
	
	public delete = async (model: DeleteImage): Promise<Image> => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const options = {
			method: "DELETE",
			headers
		};
		
		try {
			const request = new Request(this.webApiUrl + "/" + model.id, options);
			const response = await fetch(request);
			
			return response.json();
		} catch (error) {
			return new Promise((resolve, reject) => {
				if (error instanceof Error) {
					reject(error.message);
				} else {
					reject("Internal Error");
				}
			});
		}
	};
}

export default ImageService;