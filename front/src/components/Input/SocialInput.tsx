import {Input, Form} from "antd";

import {Social} from "../../types/Social";

const translated: Record<Social, string> = {
	vk: "ВКонтакте",
	odnoklassniki: "Одноклассники",
	facebook: "Facebook",
	twitter: "twitter",
	instagram: "instagram"
};

const SocialInput = ({ social }: Props) => {
	return (
		<Form.Item name={["socials", social]} label={translated[social]} labelCol={{ span: 24 }}>
			<Input placeholder={"Введите ссылку на соцсеть"}/>
		</Form.Item>
	);
};

interface Props {
	social: Social
}

export default SocialInput;