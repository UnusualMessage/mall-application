import {observer} from "mobx-react-lite";

import ItemBar from "./ItemBar";
import {InnerLink} from "../../../components/Link";

import Store from "../../../types/Store";

const Items = ({ store }: Props) => {
	return (
		<>
			<InnerLink className={""} to={"new"}>
				<span>Добавить статью</span>
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