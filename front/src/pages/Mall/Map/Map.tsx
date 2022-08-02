import {useRef} from "react";
import {observer} from "mobx-react-lite";

import css from "./map.module.scss";
import label from "/src/components/Label/label.module.scss";

import {Categories} from "./Category";
import {First} from "./Floor";
import Scaler from "./Scaler";
import Label from "../../../components/Label";

import InterfaceStore from "../../../stores/InterfaceStore";
import MapStore from "../../../stores/MapStore";
import useDragging from "../../../hooks/useDragging";
import FloorSwitcher from "./FloorSwitcher/FloorSwitcher";

const Map = () => {
	const defaultMapState = {
		left: 0,
		top: 0,
		scale: 1,
		dragging: false
	};

	const mapRef = useRef<HTMLDivElement>(null);
	const draggingRef = useRef<HTMLDivElement>(null);
	
	const [mapState] = useDragging({
		targetRef: draggingRef, defaultState: defaultMapState
	});
	
	const onFilterSwitch = () => {
		InterfaceStore.switchMapFilter();
	};
	
	return(
		<div className={css.wrapper}>
			<div className={css.toolbox}>
				<Label text={"Магазины"} className={`${css.switcher} ${label.mini} ${label.upper}`} onClick={onFilterSwitch}/>
			</div>
			
			<div className={css.content}>
				<Categories/>
				<Scaler/>
				<FloorSwitcher/>
				
				<div className={mapState.dragging ? `${css.dragger} ${css.dragging}` : `${css.dragger}`}
				     ref={draggingRef}
				>
					<div className={css.floor}
					     style={{ left: mapState.left, top: mapState.top, transform: `scale(${MapStore.getScale()})` }}
					     ref={mapRef}>
						
						<First />
					</div>
				</div>
			</div>
		</div>
	);
};

export default observer(Map);