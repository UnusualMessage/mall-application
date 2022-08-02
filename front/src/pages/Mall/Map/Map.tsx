import {MouseEventHandler, useCallback, useRef} from "react";
import {observer} from "mobx-react-lite";

import css from "./map.module.scss";
import label from "/src/components/Label/label.module.scss";

import {Categories} from "./Category";
import {First} from "./Floor";
import Scaler from "./Scaler";
import Label from "../../../components/Label";
import Tooltip from "../../../components/Tooltip/Tooltip";

import InterfaceStore from "../../../stores/InterfaceStore";
import MapStore from "../../../stores/MapStore";
import useDragging from "../../../hooks/useDragging";
import useElementOffset from "../../../hooks/useElementOffset";
import shops from "../../../data/shops";

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
	
	const [mapOffset] = useElementOffset({ targetRef: mapRef });
	
	const onClick: MouseEventHandler<SVGGElement> = useCallback((e) => {
		const x = e.clientX - mapOffset.x;
		const y = e.clientY - mapOffset.y;
		
		MapStore.setTooltip({
			left: x,
			top: y - 15,
			visible: true
		});
	}, [mapOffset]);
	
	const onFilterSwitch = () => {
		InterfaceStore.switchMapFilter();
	};
	
	return(
		<div className={css.wrapper}>
			<div className={css.toolbox}>
				<Label text={"Фильтр"} className={`${css.switcher} ${label.mini} ${label.upper}`} onClick={onFilterSwitch}/>
			</div>
			
			<div className={css.content}>
				<Categories/>
				<div className={mapState.dragging ? `${css.dragger} ${css.dragging}` : `${css.dragger}`}
				     ref={draggingRef}
				>
					<Scaler/>
					
					<Tooltip shop={shops[0]} position={MapStore.getTooltip()} visible={MapStore.getTooltip().visible}/>
					
					<div className={css.floor}
					     style={{ left: mapState.left, top: mapState.top, transform: `scale(${MapStore.getScale()})` }}
					     ref={mapRef}>
						
						<First onClick={onClick}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default observer(Map);