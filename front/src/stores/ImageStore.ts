import { action, makeObservable, observable, runInAction, toJS } from "mobx";

import ImageService from "../api/services/ImageService";
import Image from "../api/interfaces/image/Image";
import CreateImage from "../api/interfaces/image/CreateImage";
import isError from "../utils/isError";
import { requesterProps } from "./base/Requester";
import { Requester } from "./base";

const props = {
    ...requesterProps,
    images: observable,
    getAsync: action,
    createAsync: action,
    deleteAsync: action,
};

class ImageStore extends Requester {
    private images: Image[];
    private imageService: ImageService;

    constructor() {
        super();

        this.images = [];
        this.imageService = new ImageService();

        makeObservable(this, {
            ...props,
        });
    }

    public get() {
        return toJS(this.images);
    }

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

    public createAsync = async (image: CreateImage, token = "") => {
        const newImage = await this.imageService.post(image, token);

        if (isError(newImage)) {
            this.invokeError(newImage.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.images.push(newImage);
        });
    };

    public deleteAsync = async (id: string, token = "") => {
        const removedImage = await this.imageService.delete(id, token);

        if (isError(removedImage)) {
            this.invokeError(removedImage.message);
            return;
        }

        this.invokeSuccess();
        runInAction(() => {
            this.images = this.images.filter(
                (item) => item.id !== removedImage.id
            );
        });
    };
}

export default new ImageStore();
