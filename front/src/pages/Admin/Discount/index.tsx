import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { Form, message, PageHeader, Space } from "antd";

import {
    SelectInput,
    TextInput,
    ImagePicker,
    RichTextInput,
} from "../../../components/Form/inputs";
import Loader from "../../../components/Loader";
import { Update } from "../../../components/Form/buttons";

import DiscountStore from "../../../stores/DiscountStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import ShopStore from "../../../stores/ShopStore";
import { UpdateDiscount } from "../../../api/interfaces/discount";
import {
    getDiscountInitialOptions,
    getDiscountInitialValues,
    Values,
} from "../../../utils/forms/getDiscountForm";
import transliterate from "../../../utils/transliterate";
import { showMessage } from "../../../utils/showMessage";
import AuthStore from "../../../stores/AuthStore";

const rootRoute = "discounts";

const Discount = () => {
    const { id } = useParams();
    const redirect = useNavigate();
    const [form] = Form.useForm();
    const [isFetching, setIsFetching] = useState(true);

    const interfaceLocked = InterfaceStore.isLoading();

    const discount = DiscountStore.getCurrent();
    const shops = ShopStore.get();

    const initialValues = useMemo(() => {
        return getDiscountInitialValues(discount);
    }, [discount]);

    const initialOptions = useMemo(() => {
        return getDiscountInitialOptions();
    }, [discount]);

    useEffect(() => {
        const getDiscount = async () => {
            await ShopStore.getAsync("");
            await DiscountStore.getByIdAsync(id ?? "");

            if (!DiscountStore.isRequestSuccessful()) {
                message.error(DiscountStore.getErrorMessage());
                redirect(`../${rootRoute}`);
            }

            setIsFetching(false);
        };

        void getDiscount();
    }, [id]);

    if (!discount || isFetching) {
        return <Loader />;
    }

    const handleDelete = async () => {
        await AuthStore.access();

        InterfaceStore.setLoading(true);
        await DiscountStore.deleteAsync(id ?? "", AuthStore.getAccessToken());
        InterfaceStore.setLoading(false);

        const successful = DiscountStore.isRequestSuccessful();

        await showMessage(
            successful,
            "Статья удалена!",
            DiscountStore.getErrorMessage()
        );

        if (successful) {
            redirect(`../${rootRoute}`);
        }
    };

    const handleUpdate = async (values: Values) => {
        const transliteratedTitle = transliterate(values.title);

        const newDiscount: UpdateDiscount = {
            id: discount.id,
            title: values.title,
            description: values.description,
            imageId: values.image.id,
            link: transliteratedTitle,
            routePath: `/${rootRoute}/${transliteratedTitle}/${discount.id}`,
            shopId: values.shopId,
        };

        await AuthStore.access();

        InterfaceStore.setLoading(true);
        await DiscountStore.updateAsync(
            newDiscount,
            AuthStore.getAccessToken()
        );
        InterfaceStore.setLoading(false);

        await showMessage(
            DiscountStore.isRequestSuccessful(),
            "Статья обновлена!",
            DiscountStore.getErrorMessage()
        );
    };

    return (
        <Space direction={"vertical"} style={{ width: "100%" }}>
            <PageHeader
                onBack={() => redirect(`../${rootRoute}`)}
                title="Редактирование статьи"
                subTitle={discount.title}
                style={{ padding: 0, paddingBottom: 20 }}
            />

            <Form
                onFinish={handleUpdate}
                labelCol={{ span: 24 }}
                initialValues={initialValues}
                form={form}
            >
                <TextInput {...initialOptions.title} />
                <ImagePicker {...initialOptions.image} form={form} />
                <SelectInput values={shops} {...initialOptions.shopId} />
                <RichTextInput form={form} {...initialOptions.description} />
                <Update
                    isLoading={interfaceLocked}
                    handleDelete={handleDelete}
                />
            </Form>
        </Space>
    );
};

export default observer(Discount);
