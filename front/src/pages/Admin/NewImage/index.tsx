import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";

import {ImageInput} from "../../../components/Input";

import InterfaceStore from "../../../stores/InterfaceStore";
import ImageStore from "../../../stores/ImageStore";
import { CreateImage } from "../../../api/interfaces/image";
import {getImageInitialOptions, Values} from "../../../utils/getImageForm";

const rootRoute = "images";

const NewImage = () => {
	const redirect = useNavigate();
	const interfaceLocked = InterfaceStore.isLoading();
	const [form] = Form.useForm();
	
	const initialOptions = useMemo(() => {
		return getImageInitialOptions();
	}, []);
	
	const handleCreate = async (values: Values) => {
		const newImage: CreateImage = {
			image: values.image[0].originFileObj as File,
		};
		
		InterfaceStore.setLoading(true);
		await ImageStore.createAsync(newImage);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Добавление изображения"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleCreate} labelCol={{span: 24}} form={form}>
				<ImageInput {...initialOptions.title}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={interfaceLocked} disabled={interfaceLocked}>
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

export default observer(NewImage);