import {observer} from "mobx-react-lite";

import ItemBar from "./ItemBar";

import Store from "../../../types/Store";

const Items = ({ store }: Props) => {
	return (
		<>
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
	store: Store
}

export default observer(Items);