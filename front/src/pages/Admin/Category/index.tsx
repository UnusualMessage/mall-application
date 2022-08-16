import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Popconfirm, Space} from "antd";

import Loader from "../../../components/Loader";
import {TextInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import {Values} from "../../../hooks/useForm";
import UpdateCategory from "../../../api/interfaces/category/UpdateCategory";
import CategoryStore from "../../../stores/CategoryStore";
import DeleteCategory from "../../../api/interfaces/category/DeleteCategory";
import CategoryInterface from "../../../api/interfaces/category/Category";
import categories from "../../../data/categories";
import {getCategoryInitialOptions, getCategoryInitialValues} from "../../../utils/getCategoryForm";

const rootRoute = "categories";

const Category = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [category, setCategory] = useState<CategoryInterface>();
	
	const isLoading = InterfaceStore.isLoading();
	
	const initialValues = useMemo(() => {
		return getCategoryInitialValues(category);
	}, [category]);
	
	const initialOptions = useMemo(() => {
		return getCategoryInitialOptions();
	}, [category]);
	
	useEffect(() => {
		const getCategory = async () => {
			const categories = await CategoryStore.getAsync(`Filters=Id==${id}`);
			if (categories.length !== 0) {
				setCategory(categories[0]);
			} else {
				redirect(`../${rootRoute}`);
			}
		};
		
		setCategory(categories.find(item => item.id === id));
		// void getCategory();
	}, [category]);
	
	if (!category) {
		return <Loader/>;
	}
	
	const handleDelete = async () => {
		const id: DeleteCategory = {
			id: category.id,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.deleteAsync(id);
		InterfaceStore.setLoading(false);
	};
	
	const handleUpdate = async (values: Values) => {
		const newCategory: UpdateCategory = {
			id: category.id,
			title: values.title,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.updateAsync(newCategory);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Редактирование категории"
			            subTitle={category.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues}>
				<TextInput {...initialOptions.title}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Изменить
					</Button>
					
					<Popconfirm title={"Удалить?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={isLoading} disabled={isLoading}>
							Удалить
						</Button>
					</Popconfirm>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Category);