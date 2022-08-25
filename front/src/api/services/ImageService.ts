import Image from "../interfaces/image/Image";
import CreateImage from "../interfaces/image/CreateImage";
import {Error} from "../interfaces/fetch";
import resolveResponse from "../../utils/resolveResponse";
import {get, remove} from "./requests";

class ImageService {
	protected readonly url: string;
	
	constructor() {
		this.url = "/api/images";
	}
	
	public get = async (query: string): Promise<Image[] | Error> => {
		return await get(this.url, "", query);
	};
	
	public post = async (model: CreateImage): Promise<Image | Error> => {
		const formData = new FormData();
		
		formData.append("image", model.image);
		
		const options = {
			method: "POST",
			body: formData
		};
		
		const request = new Request(this.url, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
	
	public delete = async (id: string): Promise<Image | Error> => {
		return await remove(this.url, id, "");
	};
}

export default ImageService;