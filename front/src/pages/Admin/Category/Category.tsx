import {useNavigate, useParams} from "react-router-dom";
import {MouseEventHandler, useEffect, useMemo} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import Button from "../../../components/Button";
import Input from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import categories from "../../../data/categories";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useForm, {Values} from "../../../hooks/useForm";
import getCategoryForm from "../../../utils/getCategoryForm";
import UpdateCategory from "../../../api/interfaces/category/UpdateCategory";
import CategoryStore from "../../../stores/CategoryStore";
import DeleteCategory from "../../../api/interfaces/category/DeleteCategory";

const Category = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const category = categories.find(category => category.id === id);
	const isLoading = InterfaceStore.isLoading();
	
	const form = useMemo(() => {
		return getCategoryForm(category);
	}, [category]);
	
	const { inputs, handleSubmit } = useForm({ form: form});
	const { title } = inputs;
	
	useEffect(() => {
		if (!category) {
			redirect("");
		}
	}, [category]);
	
	if (!category) {
		return null;
	}
	
	const handleDelete: MouseEventHandler = async () => {
		const id: DeleteCategory = {
			id: category.id,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.deleteAsync(id);
		InterfaceStore.setLoading(false);
	};
	
	const onSubmit = async (values: Values) => {
		const newCategory: UpdateCategory = {
			id: category.id,
			title: values.title,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.updateAsync(newCategory);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			{
				isLoading ? <LoadingOverlay/> : <></>
			}
			
			<Input label={"Название категории"}
			       type={"text"}
			       placeholder={"Введите название категории"}
			       defaultValue={category.title}
			       name={"title"}
			       onChange={title.onChange}
			/>
			
			<div className={classNames(css.buttons)}>
				<Button text={"Изменить"} disabled={isLoading} submit/>
				<Button text={"Удалить"} disabled={isLoading} onClick={handleDelete}/>
			</div>
		</form>
	);
};

export default observer(Category);