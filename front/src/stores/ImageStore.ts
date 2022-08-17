import {makeAutoObservable, runInAction, toJS} from "mobx";
import ImageService from "../api/services/ImageService";
import Image from "../api/interfaces/image/Image";
import CreateImage from "../api/interfaces/image/CreateImage";
import DeleteImage from "../api/interfaces/image/DeleteImage";

class ImageStore {
	private images: Image[];
	private imageService: ImageService;
	
	constructor() {
		this.images = [];
		this.imageService = new ImageService("https://localhost:44328/api/images/");

		makeAutoObservable(this);
	}
	
	public get() {
		return toJS(this.images);
	}
	
	public getAsync = async (query: string) => {
		try {
			const images = await this.imageService.get(query);
			
			runInAction(() => {
				this.images = images;
			});
			
		} catch(error) {
		
		}
	};
	
	public createAsync = async (image: CreateImage) => {
		try {
			const newImage = await this.imageService.post(image);
			
			runInAction(() => {
				this.images.push(newImage);
			});
			
		} catch(error) {
		
		}
	};
	
	public deleteAsync = async (image: DeleteImage) => {
		try {
			const removedImage = await this.imageService.delete(image);
			
			runInAction(() => {
				this.images = this.images.filter(item => item.id !== removedImage.id);
			});
			
		} catch(error) {
		}
	};
}

export default new ImageStore();