import { Col, Row } from "antd";

import ItemCard from "./ItemCard";

import Shop from "../../../api/interfaces/shop/Shop";
import Discount from "../../../api/interfaces/discount/Discount";
import Event from "../../../api/interfaces/event/Event";
import Category from "../../../api/interfaces/category/Category";

const cardBreakpoints = {
	xs: 12,
	sm: 12,
	md: 8,
	lg: 6,
	xl: 6,
	xxl: 4
};

const Items = ({ items }: Props) => {
	return (
		<Row gutter={[32, 32]} justify={"space-evenly"}>
			{
				items.map(item => {
					if ("image" in item && "title" in item) {
						return (
							<Col {...cardBreakpoints} key={item.id}>
								<ItemCard title={item.title} to={item.id} image={item.image}/>
							</Col>
						);
					} else if ("title" in item) {
						return (
							<Col {...cardBreakpoints} key={item.id}>
								<ItemCard title={item.title} to={item.id}/>
							</Col>
						);
					} else {
						return (
							<Col {...cardBreakpoints} key={item.id}>
								<ItemCard image={item.image}/>
							</Col>
						);
					}
					
				})
			}
		</Row>
	);
};

interface Image {
	id: string
	image: string
}

interface Props {
	items: Discount[] | Shop[] | Event[] | Category[] | Image[],
}

export default Items;