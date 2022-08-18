import {makeAutoObservable, runInAction, toJS} from "mobx";
import ImageService from "../api/services/ImageService";
import Image from "../api/interfaces/image/Image";
import CreateImage from "../api/interfaces/image/CreateImage";

class ImageStore {
	private images: Image[];
	private imageService: ImageService;
	
	constructor() {
		this.images = [];
		this.imageService = new ImageService();

		makeAutoObservable(this);
	}
	
	public get() {
		return toJS(this.images);
	}
	
	public getAsync = async (query: string) => {
		const images = await this.imageService.get(query);
		
		runInAction(() => {
			this.images = images;
		});
	};
	
	public createAsync = async (image: CreateImage) => {
		const newImage = await this.imageService.post(image);
		
		runInAction(() => {
			this.images.push(newImage);
		});
	};
	
	public deleteAsync = async (id: string) => {
		const removedImage = await this.imageService.delete(id);
		
		runInAction(() => {
			this.images = this.images.filter(item => item.id !== removedImage.id);
		});
	};
}

export default new ImageStore();