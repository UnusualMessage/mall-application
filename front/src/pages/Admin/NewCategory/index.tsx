import {observer} from "mobx-react-lite";
import {Button, Form, Input, Space, Typography} from "antd";

import InterfaceStore from "../../../stores/InterfaceStore";
import {Values} from "../../../hooks/useForm";
import CategoryStore from "../../../stores/CategoryStore";
import CreateCategory from "../../../api/interfaces/category/CreateCategory";

const NewCategory = () => {
	const isLoading = InterfaceStore.isLoading();
	
	const [form] = Form.useForm();
	
	const handleCreate = async (values: Values) => {
		const newCategory: CreateCategory = {
			title: values.title,
		};
		
		InterfaceStore.setLoading(true);
		await CategoryStore.createAsync(newCategory);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<Typography.Title level={2}>
				Добавление категории
			</Typography.Title>
			
			<Form form={form} onFinish={handleCreate} style={{width: "100%"}}>
				<Form.Item label="Категория" name="title"
				           rules={[{ required: true, message: "Необходимо ввести название категории" }]}>
					<Input />
				</Form.Item>
				
				<Space>
					<Form.Item label=" " colon={false}>
						<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
							Добавить
						</Button>
					</Form.Item>
					
					<Form.Item label=" " colon={false}>
						<Button type="dashed" onClick={() => form.resetFields()}>
							Очистить
						</Button>
					</Form.Item>
				</Space>
			</Form>
		</Space>
	
	);
};

export default observer(NewCategory);