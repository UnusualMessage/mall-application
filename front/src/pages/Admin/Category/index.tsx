import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form, message, PageHeader, Space } from "antd";

import Loader from "../../../components/Loader";
import { TextInput } from "../../../components/Form/inputs";
import { Update } from "../../../components/Form/buttons";

import InterfaceStore from "../../../stores/InterfaceStore";
import CategoryStore from "../../../stores/CategoryStore";
import { UpdateCategory } from "../../../api/interfaces/category";
import {
    getCategoryInitialOptions,
    getCategoryInitialValues,
    Values,
} from "../../../utils/forms/getCategoryForm";
import { showMessage } from "../../../utils/showMessage";
import AuthStore from "../../../stores/AuthStore";

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
            await CategoryStore.getByIdAsync(id ?? "");

            if (!CategoryStore.isRequestSuccessful()) {
                message.error(CategoryStore.getErrorMessage());
                redirect(`../${rootRoute}`);
            }

            setIsFetching(false);
        };

        void getCategory();
    }, []);

    if (!category || isFetching) {
        return <Loader />;
    }

    const handleDelete = async () => {
        await AuthStore.access();

        InterfaceStore.setLoading(true);
        await CategoryStore.deleteAsync(id ?? "", AuthStore.getAccessToken());
        InterfaceStore.setLoading(false);

        const successful = CategoryStore.isRequestSuccessful();

        await showMessage(
            successful,
            "Категория удалена!",
            CategoryStore.getErrorMessage()
        );

        if (successful) {
            redirect(`../${rootRoute}`);
        }
    };

    const handleUpdate = async (values: Values) => {
        const newCategory: UpdateCategory = {
            id: category.id,
            title: values.title,
        };

        await AuthStore.access();

        InterfaceStore.setLoading(true);
        await CategoryStore.updateAsync(
            newCategory,
            AuthStore.getAccessToken()
        );
        InterfaceStore.setLoading(false);

        await showMessage(
            CategoryStore.isRequestSuccessful(),
            "Категория обновлена!",
            CategoryStore.getErrorMessage()
        );
    };

    return (
        <Space direction={"vertical"} style={{ width: "100%" }}>
            <PageHeader
                onBack={() => redirect(`../${rootRoute}`)}
                title="Редактирование категории"
                subTitle={category.title}
                style={{ padding: 0, paddingBottom: 20 }}
            />

            <Form
                onFinish={handleUpdate}
                labelCol={{ span: 24 }}
                initialValues={initialValues}
            >
                <TextInput {...initialOptions.title} />
                <Update
                    isLoading={interfaceLocked}
                    handleDelete={handleDelete}
                />
            </Form>
        </Space>
    );
};

export default observer(Category);
