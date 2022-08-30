import { Button, FormInstance, Space } from "antd";

export const Create = ({ isLoading, form }: Props) => {
    return (
        <Space>
            <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
            >
                Добавить
            </Button>

            <Button type="dashed" onClick={() => form.resetFields()}>
                Очистить
            </Button>
        </Space>
    );
};

interface Props {
    isLoading: boolean;
    form: FormInstance;
}
