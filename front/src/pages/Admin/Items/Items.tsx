import {observer} from "mobx-react-lite";
import classNames from "classnames";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import ItemBar from "./ItemBar";
import {InnerLink} from "../../../components/Link";
import Label from "../../../components/Label";

import Shop from "../../../api/interfaces/shop/Shop";
import Discount from "../../../api/interfaces/discount/Discount";
import Event from "../../../api/interfaces/event/Event";

const Items = ({ items }: Props) => {
	return (
		<>
			<InnerLink className={""} to={"new"}>
				<Label className={classNames(label.big, link.underlined)} text={"Добавить статью"}/>
			</InnerLink>
			{
				items.map(item => {
					return (
						<ItemBar title={item.title} image={item.image} to={item.id} key={item.id}/>
					);
				})
			}
		</>
	);
};

interface Props {
	items: Discount[] | Shop[] | Event[],
}

export default observer(Items);