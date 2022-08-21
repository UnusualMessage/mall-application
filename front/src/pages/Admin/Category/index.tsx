import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Popconfirm, Space} from "antd";

import Loader from "../../../components/Loader";
import {TextInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import CategoryStore from "../../../stores/CategoryStore";
import { UpdateCategory } from "../../../api/interfaces/category";
import {getCategoryInitialOptions, getCategoryInitialValues, Values} from "../../../utils/forms/getCategoryForm";

const rootRoute = "categories";

const Category = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [isFetching, setIsFetching] = useState(true);
	
	const interfaceLocked = InterfaceStore.isLoading();
	const category = CategoryStore.getCurrent();
	
	const initialValues = useMemo(() => {
		return getCategoryInitialValues(category);
	}, [category]);
	
	const initialOptions = useMemo(() => {
		return getCategoryInitialOptions();
	}, [category]);
	
	useEffect(() => {
		const getCategory = async () => {
			const category = await CategoryStore.getByIdAsync(id ?? "");
			
			if (!category) {
				redirect(`../${rootRoute}`);
			}
			
			setIsFetching(false);
		};
		
		void getCategory();
	}, [category]);
	
	if (!category || isFetching) {
		return <Loader/>;
	}
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		await CategoryStore.deleteAsync(id ?? "");
		InterfaceStore.setLoading(false);
		redirect(`../${rootRoute}`);
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
					<Button type="primary" htmlType="submit" loading={interfaceLocked} disabled={interfaceLocked}>
						Изменить
					</Button>
					
					<Popconfirm title={"Удалить?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={interfaceLocked} disabled={interfaceLocked}>
							Удалить
						</Button>
					</Popconfirm>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Category);