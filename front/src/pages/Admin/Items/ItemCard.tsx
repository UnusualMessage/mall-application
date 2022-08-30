import {Card, Space, Typography} from "antd";
import {TagOutlined} from "@ant-design/icons";
import {memo} from "react";

import {InnerLink} from "../../../components/Link";

const ItemBar = ({ title, image, to }: Props) => {
	if (image && title && to) {
		return (
			<InnerLink to={to}>
				<Card hoverable cover={<img alt="" src={image} />}>
					<Card.Meta title={<Typography.Text> {title} </Typography.Text>} />
				</Card>
			</InnerLink>
		);
	} else if (title && to) {
		return (
			<InnerLink to={to}>
				<Card hoverable>
					<Space>
						<TagOutlined/>
						{title}
					</Space>
				</Card>
			</InnerLink>
		);
	} else {
		return (
			<Card hoverable cover={<img alt="" src={image} />}>
				<Card.Meta title={<Typography.Text> Изображение </Typography.Text>} />
			</Card>
		);
	}
};

interface Props {
	title?: string,
	image?: string,
	to?: string
}

export default memo(ItemBar);