import { Input, Form, Space } from "antd";

import { socials, SocialType } from "../../../types/Social";

const translated: Record<SocialType, string> = {
    vk: "ВКонтакте",
    odnoklassniki: "Одноклассники",
    facebook: "Facebook",
    twitter: "twitter",
    instagram: "instagram",
};

const SocialsInput = () => {
    return (
        <Form.Item label={"Социальные сети"}>
            <Space wrap>
                {socials.map((social) => (
                    <SocialInput social={social} key={social} />
                ))}
            </Space>
        </Form.Item>
    );
};

const SocialInput = ({ social }: Props) => {
    return (
        <Form.Item
            name={["socials", social]}
            label={translated[social]}
            labelCol={{ span: 24 }}
        >
            <Input placeholder={"Введите ссылку на соцсеть"} />
        </Form.Item>
    );
};

interface Props {
    social: SocialType;
}

export default SocialsInput;
