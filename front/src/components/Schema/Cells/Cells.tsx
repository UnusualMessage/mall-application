import {observer} from "mobx-react-lite";

import {Cell} from "./index";

import MapStore from "../../../stores/MapStore";
import CellStore from "../../../stores/CellStore";
import {useEffect} from "react";

const Cells = ({ readonly }: Props) => {
	const floor = MapStore.getFloor();
	
	const cells = CellStore.get();
	
	useEffect(() => {
		const getCells = async () => {
			await CellStore.getAsync(`Filters=Floor==${floor}`);
		};
		
		void getCells();
	}, [floor]);
	
	return(
		<>
			{
				cells.map(cell => {
					return(
						<Cell key={cell.number} cell={cell} readonly={readonly}/>
					);
				})
			}
		</>
	);
};

interface Props {
	readonly?: boolean
}

export default observer(Cells);