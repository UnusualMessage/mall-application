import { Button, Form, FormRule, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageInput = ({ label, name, rules }: Props) => {
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e.fileList;
    };

    return (
        <Form.Item
            label={label}
            name={name}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={rules}
        >
            <Upload action={"/api/mock/"} maxCount={1} id={name}>
                <Button icon={<UploadOutlined />}>Выбрать изображение</Button>
            </Upload>
        </Form.Item>
    );
};

interface Props {
    label: string;
    name: string;
    rules?: FormRule[];
}

export default ImageInput;
