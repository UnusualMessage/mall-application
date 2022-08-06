import {ChangeEventHandler, useCallback, useState} from "react";
import classNames from "classnames";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import css from "./shop.module.scss";

import Image from "../../../components/Image";
import Input from "../../../components/Input";
import TextEditor from "../../../components/TextEditor";

const NewShop = () => {
	const { register, handleSubmit } = useForm();
	const [imagePreview, setImagePreview] = useState<File | undefined>(undefined);
	
	const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
		console.log(data);
	}, []);
	
	const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setImagePreview(file);
		}
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			<Image classes={classNames(css.image)} source={imagePreview ? URL.createObjectURL(imagePreview) : ""}/>
			
			<Input label={"Лого"}
			       type={"file"}
			       placeholder={"Введите название магазина"}
			       defaultValue={""}
			       register={register}
			       name={"image"}
			       onChange={handleImage}
			/>
			
			<div className={`${css.contacts}`}>
				<Input label={"Название"}
				       type={"text"}
				       placeholder={"Введите название магазина"}
				       defaultValue={""}
				       register={register}
				       name={"name"}
				/>
				
				<Input label={"Этаж"}
				       type={"text"}
				       placeholder={"Введите номер этажа"}
				       defaultValue={""}
				       register={register}
				       name={"floor"}
				/>
				
				<Input label={"Время"}
				       type={"text"}
				       placeholder={"Введите время работы"}
				       defaultValue={""}
				       register={register}
				       name={"schedule"}
				/>
				
				<Input label={"Телефон"}
				       type={"text"}
				       placeholder={"Введите номер телефона"}
				       defaultValue={""}
				       register={register}
				       name={"phone"}
				/>
				
				<Input label={"Сайт"}
				       type={"text"}
				       placeholder={"Введите адрес сайта"}
				       defaultValue={""}
				       register={register}
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