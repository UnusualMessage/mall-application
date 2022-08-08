import {observer} from "mobx-react-lite";

import {Cell} from "./index";

import MapStore from "../../../../stores/MapStore";

const Cells = ({ floor }: Props) => {
	return(
		<>
			{
				MapStore.getSchemaByFloor(floor).map(cell => {
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

interface Props {
	floor: number
}

export default observer(Cells);