import {observer} from "mobx-react-lite";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import ItemBar from "./ItemBar";
import {InnerLink} from "../../../components/Link";
import Label from "../../../components/Label";

import Store from "../../../types/Store";
import classNames from "classnames";

const Items = ({ store }: Props) => {
	return (
		<>
			<InnerLink className={""} to={"new"}>
				<Label className={classNames(label.big, link.underlined)} text={"Добавить статью"}/>
			</InnerLink>
			{
				store.get().map(shop => {
					return (
						<ItemBar title={shop.title} image={shop.image} to={shop.link} key={shop.id}/>
					);
				})
			}
		</>
	);
};

interface Props {
	store: Store,
}

export default observer(Items);