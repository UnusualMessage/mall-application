import { observer } from "mobx-react-lite";
import { Form, PageHeader, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { ImageInput } from "../../../components/Form/inputs";
import { Create } from "../../../components/Form/buttons";

import InterfaceStore from "../../../stores/InterfaceStore";
import ImageStore from "../../../stores/ImageStore";
import { CreateImage } from "../../../api/interfaces/image";
import {
    getImageInitialOptions,
    Values,
} from "../../../utils/forms/getImageForm";
import AuthStore from "../../../stores/AuthStore";

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

        await AuthStore.access();

        InterfaceStore.setLoading(true);
        await ImageStore.createAsync(newImage, AuthStore.getAccessToken());
        InterfaceStore.setLoading(false);
    };

    return (
        <Space direction={"vertical"} style={{ width: "100%" }}>
            <PageHeader
                onBack={() => redirect(`../${rootRoute}`)}
                title="Добавление изображения"
                style={{ padding: 0, paddingBottom: 20 }}
            />

            <Form onFinish={handleCreate} labelCol={{ span: 24 }} form={form}>
                <ImageInput {...initialOptions.image} />
                <Create isLoading={interfaceLocked} form={form} />
            </Form>
        </Space>
    );
};

export default observer(NewImage);
