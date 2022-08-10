import {useMemo} from "react";
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "../article.module.scss";

import {TextInput} from "../../../components/Input";
import Button from "../../../components/Button";

import InterfaceStore from "../../../stores/InterfaceStore";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useForm, {Values} from "../../../hooks/useForm";
import getCategoryForm from "../../../utils/getCategoryForm";
import CategoryStore from "../../../stores/CategoryStore";
import CreateCategory from "../../../api/interfaces/category/CreateCategory";

const NewCategory = () => {
	const isLoading = InterfaceStore.isLoading();
	
	const form = useMemo(() => {
		return getCategoryForm();
	}, []);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title } = inputs;
	
	const handleCreate = async (values: Values) => {
		const newCategory: CreateCategory = {
			title: values.title,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.createAsync(newCategory);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(handleCreate)}>
			{
				InterfaceStore.isLoading() ? <LoadingOverlay/> : <></>
			}
			
			<TextInput {...form.title.options} onChange={title.onChange} />
			
			<div className={classNames(css.buttons)}>
				<Button text={"Добавить"} disabled={isLoading} submit/>
			</div>
		</form>
	);
};

export default observer(NewCategory);