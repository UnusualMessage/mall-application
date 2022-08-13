import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import css from "./images.module.scss";

import {ImageInput} from "../../../components/Input";
import Image from "../../../components/Image";

import ImageStore from "../../../stores/ImageStore";

const Images = () => {
	const [image, setImage] = useState<File>();
	
	useEffect(() => {
		const createImage = async () => {
			if (image) {
				await ImageStore.createAsync({
					image: image
				});
			}
		};
		
		void createImage();
	}, [image]);
	
	return (
		<div className={css.wrapper}>
			<ImageInput setImage={setImage} name={"image"} placeholder={"Выберите картинку"} label={"Изображение"}/>
			{
				ImageStore.get().map(image => {
					return <Image classes={""} source={image.path} key={image.id}/>;
				})
			}
		</div>
	);
};

export default observer(Images);