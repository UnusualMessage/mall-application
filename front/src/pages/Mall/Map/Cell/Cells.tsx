import {observer} from "mobx-react-lite";

import {Cell} from "./index";

import MapStore from "../../../../stores/MapStore";

const Cells = () => {
	return(
		<>
			{
				MapStore.get().map(cell => {
					return(
						<Cell key={cell.id}>
							{cell.path}
						</Cell>
					);
				})
			}
		</>
	);
};

export default observer(Cells);