import {makeAutoObservable, runInAction, toJS} from "mobx";

import ImageService from "../api/services/ImageService";
import Image from "../api/interfaces/image/Image";
import CreateImage from "../api/interfaces/image/CreateImage";
import RequestInfo from "../api/interfaces/RequestInfo";
import isError from "../utils/isError";

class ImageStore {
	private images: Image[];
	private imageService: ImageService;
	
	private lastRequest: RequestInfo;
	
	constructor() {
		this.images = [];
		this.imageService = new ImageService();
		
		this.lastRequest = {
			message: "",
			successful: true
		};

		makeAutoObservable(this);
	}
	
	public get() {
		return toJS(this.images);
	}
	
	protected invokeSuccess = () => {
		this.lastRequest = {
			message: "",
			successful: true
		};
	};
	
	private invokeError = (error: string) => {
		this.lastRequest = {
			message: error,
			successful: false
		};
	};
	
	public isRequestSuccessful = () => {
		return this.lastRequest.successful;
	};
	
	public getErrorMessage = () => {
		return this.lastRequest.message;
	};
	
	public getAsync = async (query: string) => {
		const images = await this.imageService.get(query);
		
		if (isError(images)) {
			this.invokeError(images.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.images = images;
		});
	};
	
	public createAsync = async (image: CreateImage) => {
		const newImage = await this.imageService.post(image);
		
		if (isError(newImage)) {
			this.invokeError(newImage.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.images.push(newImage);
		});
	};
	
	public deleteAsync = async (id: string) => {
		const removedImage = await this.imageService.delete(id);
		
		if (isError(removedImage)) {
			this.invokeError(removedImage.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.images = this.images.filter(item => item.id !== removedImage.id);
		});
	};
}

export default new ImageStore();