import {MouseEventHandler} from "react";
import {observer} from "mobx-react-lite";

import {Cell} from "./index";

import MapStore from "../../../../stores/MapStore";

const Cells = ({ onClick }: Props) => {
	return(
		<>
			{
				MapStore.get().map(cell => {
					return(
						<Cell key={cell.id} onClick={onClick}>
							{cell.path}
						</Cell>
					);
				})
			}
		</>
	);
};

interface Props {
	onClick: MouseEventHandler<SVGGElement>;
}

export default observer(Cells);