import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";

import {Cell} from "./index";

import MapStore from "../../../stores/MapStore";
import CellStore from "../../../stores/CellStore";

const Cells = ({ readonly }: Props) => {
	const [isFetching, setIsFetching] = useState(true);
	
	const floor = MapStore.getFloor();
	const cells = CellStore.get();
	
	useEffect(() => {
		const getCells = async () => {
			setIsFetching(true);
			await CellStore.getAsync(`Filters=Floor==${floor}`);
			setIsFetching(false);
		};
		
		void getCells();
	}, [floor]);
	
	if (isFetching) {
		return null;
	}
	
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