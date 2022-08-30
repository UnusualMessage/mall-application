import { observer } from "mobx-react-lite";
import { Form, PageHeader, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { TextInput } from "../../../components/Form/inputs";
import { Create } from "../../../components/Form/buttons";

import InterfaceStore from "../../../stores/InterfaceStore";
import CategoryStore from "../../../stores/CategoryStore";
import { CreateCategory } from "../../../api/interfaces/category";
import {
    getCategoryInitialOptions,
    getCategoryInitialValues,
    Values,
} from "../../../utils/forms/getCategoryForm";
import { showMessage } from "../../../utils/showMessage";
import AuthStore from "../../../stores/AuthStore";

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
        const newCategory: CreateCategory = {
            title: values.title,
        };

        await AuthStore.access();

        InterfaceStore.setLoading(true);
        await CategoryStore.createAsync(
            newCategory,
            AuthStore.getAccessToken()
        );
        InterfaceStore.setLoading(false);

        await showMessage(
            CategoryStore.isRequestSuccessful(),
            "Статья добавлена!",
            CategoryStore.getErrorMessage()
        );
    };

    return (
        <Space direction={"vertical"} style={{ width: "100%" }}>
            <PageHeader
                onBack={() => redirect(`../${rootRoute}`)}
                title="Добавление категории"
                style={{ padding: 0, paddingBottom: 20 }}
            />

            <Form
                onFinish={handleCreate}
                labelCol={{ span: 24 }}
                initialValues={initialValues}
                form={form}
            >
                <TextInput {...initialOptions.title} />
                <Create isLoading={isLoading} form={form} />
            </Form>
        </Space>
    );
};

export default observer(NewCategory);
