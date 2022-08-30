import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button, Form, Layout, PageHeader, Space } from "antd";

import css from "./index.module.scss";

import { TextInput } from "../../../components/Form/inputs";

import AuthenticateUser from "../../../api/interfaces/user/AuthenticateUser";
import AuthStore from "../../../stores/AuthStore";
import {
    getAuthInitialOptions,
    Values,
} from "../../../utils/forms/getAuthForm";
import InterfaceStore from "../../../stores/InterfaceStore";

const { Content } = Layout;

const Authorization = () => {
    const redirect = useNavigate();
    const isLoading = InterfaceStore.isLoading();

    const initialOptions = useMemo(() => {
        return getAuthInitialOptions();
    }, []);

    const authenticate = async (values: Values) => {
        const user: AuthenticateUser = {
            login: values.login,
            password: values.password,
        };

        await AuthStore.authenticateUser(user);

        if (AuthStore.entered()) {
            redirect("/admin");
        }
    };

    return (
        <Layout className={css.layout}>
            <Content className={css.wrapper}>
                <Space className={css.content} direction={"vertical"}>
                    <PageHeader
                        onBack={() => redirect("/")}
                        title="Вход"
                        style={{ padding: 0, paddingBottom: 20 }}
                    />

                    <Form onFinish={authenticate} labelCol={{ span: 24 }}>
                        <TextInput {...initialOptions.login} />
                        <TextInput {...initialOptions.password} password />

                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Подтвердить
                            </Button>
                        </Space>
                    </Form>
                </Space>
            </Content>
        </Layout>
    );
};

export { default as RequireAuth } from "./RequireAuth";
export default observer(Authorization);
