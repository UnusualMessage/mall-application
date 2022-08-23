import classNames from "classnames";
import {useRef} from "react";
import {observer} from "mobx-react-lite";

import css from "../../pages/Mall/Map/map.module.scss";

import {First, Second} from "./Floor";

import MapStore from "../../stores/MapStore";
import useDragging from "../../hooks/useDragging";

const Schema = ({ readonly }: Props) => {
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
	
	const classes = classNames({
		[css.dragger]: true,
		[css.dragging]: mapState.dragging
	});
	
	return (
		<div className={classes}
		     ref={draggingRef}
		>
			<div className={classNames(css.floor)}
			     style={{ left: mapState.left, top: mapState.top, transform: `scale(${MapStore.getScale()})` }}
			     ref={mapRef}>
				
				{
					MapStore.getFloor() === 1
						?
						<First readonly={readonly}/>
						:
						<Second readonly={readonly}/>
				}
			</div>
		</div>
	);
};

interface Props {
	readonly?: boolean
}

export default observer(Schema);