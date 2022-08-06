import {ChangeEventHandler, useState} from "react";
import classNames from "classnames";

import css from "./shop.module.scss";

import Image from "../../../components/Image";
import Input from "../../../components/Input";
import TextEditor from "../../../components/TextEditor";

const NewShop = () => {
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);

	
	const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setImagePreview(file);
		}
	};
	
	return(
		<form className={classNames(css.wrapper)} >
			<Image classes={classNames(css.image)} source={imagePreview ? URL.createObjectURL(imagePreview) : ""}/>
			
			<Input label={"Лого"}
			       type={"file"}
			       placeholder={"Введите название магазина"}
			       defaultValue={""}
			       name={"image"}
			       onChange={handleImage}
			/>
			
			<div className={`${css.contacts}`}>
				<Input label={"Название"}
				       type={"text"}
				       placeholder={"Введите название магазина"}
				       defaultValue={""}
				       name={"name"}
				/>
				
				<Input label={"Этаж"}
				       type={"text"}
				       placeholder={"Введите номер этажа"}
				       defaultValue={""}
				       name={"floor"}
				/>
				
				<Input label={"Время"}
				       type={"text"}
				       placeholder={"Введите время работы"}
				       defaultValue={""}
				       name={"schedule"}
				/>
				
				<Input label={"Телефон"}
				       type={"text"}
				       placeholder={"Введите номер телефона"}
				       defaultValue={""}
				       name={"phone"}
				/>
				
				<Input label={"Сайт"}
				       type={"text"}
				       placeholder={"Введите адрес сайта"}
				       defaultValue={""}
				       name={"site"}
				/>
			</div>
			
			<TextEditor className={css.description} readonly={false} defaultValue={"[{\"type\":\"paragraph\",\"align\":\"left\",\"children\":[{\"text\":\"Hello, world\",\"bold\":true,\"italic\":true}]}]"}/>
			
			<div className={classNames(css.buttons)}>
				<button type={"submit"}>
					Добавить
				</button>
			</div>
		</form>
	);
};

export default NewShop;