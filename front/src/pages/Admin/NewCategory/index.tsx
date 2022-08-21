import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";

import {TextInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import CategoryStore from "../../../stores/CategoryStore";
import { CreateCategory } from "../../../api/interfaces/category";
import {getCategoryInitialOptions, getCategoryInitialValues, Values} from "../../../utils/forms/getCategoryForm";

const rootRoute = "categories";

const NewCategory = () => {
	const redirect = useNavigate();
	const isLoading = InterfaceStore.isLoading();
	const [form] = Form.useForm();
	
	const initialValues = useMemo(() => {
		return getCategoryInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getCategoryInitialOptions();
	}, []);
	
	const handleCreate = async (values: Values) => {
		console.log(values);
		const newCategory: CreateCategory = {
			title: values.title,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.createAsync(newCategory);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Добавление категории"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleCreate} labelCol={{span: 24}} initialValues={initialValues} form={form}>
				<TextInput {...initialOptions.title}/>

				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Добавить
					</Button>
					
					<Button type="dashed" onClick={() => form.resetFields()}>
						Очистить
					</Button>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(NewCategory);