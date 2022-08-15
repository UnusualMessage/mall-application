import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, Input, PageHeader, Popconfirm, Space} from "antd";

import InterfaceStore from "../../../stores/InterfaceStore";
import {Values} from "../../../hooks/useForm";
import UpdateCategory from "../../../api/interfaces/category/UpdateCategory";
import CategoryStore from "../../../stores/CategoryStore";
import DeleteCategory from "../../../api/interfaces/category/DeleteCategory";
import CategoryInterface from "../../../api/interfaces/category/Category";
import Loader from "../../../components/Loader";
import categories from "../../../data/categories";

const Category = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [category, setCategory] = useState<CategoryInterface>();
	
	const isLoading = InterfaceStore.isLoading();
	
	const [form] = Form.useForm();
	
	useEffect(() => {
		const getCategory = async () => {
			const categories = await CategoryStore.getAsync(`Filters=Id==${id}`);
			if (categories.length !== 0) {
				setCategory(categories[0]);
			} else {
				redirect("../");
			}
		};
		
		setCategory(categories.find(item => item.id === id));
		// void getCategory();
	}, [category]);
	
	if (!category) {
		return <Loader/>;
	}
	
	const initialValues = {
		"title": category.title
	};
	
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
			<PageHeader onBack={() => redirect("../categories")}
			            title="Редактирование категории"
			            subTitle={category.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form form={form} onFinish={handleUpdate} style={{width: "100%"}} initialValues={initialValues}>
				<Form.Item label="Категория" name="title"
				           rules={[{ required: true, message: "Необходимо ввести название категории" }]}>
					<Input />
				</Form.Item>
				
				<Space>
					<Form.Item colon={false}>
						<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
							Добавить
						</Button>
					</Form.Item>
					
						<Form.Item colon={false} >
							<Popconfirm placement="top" title={"Удалить?"} onConfirm={() => handleDelete()}
							            okText="Да" cancelText="Нет">
								
								<Button type="primary" danger loading={isLoading} disabled={isLoading}>
									Удалить
								</Button>
							</Popconfirm>
						</Form.Item>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Category);