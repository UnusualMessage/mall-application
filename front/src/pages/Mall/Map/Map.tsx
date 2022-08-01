import {MouseEventHandler, TouchEventHandler, useCallback, useEffect, useRef, useState} from "react";
import debounce from "lodash/debounce";
import {observer} from "mobx-react-lite";

import css from "./map.module.scss";
import label from "/src/components/Label/label.module.scss";

import {Categories} from "./Category";
import {First} from "./Floor";
import Scaler from "./Scaler";
import Label from "../../../components/Label";

import InterfaceStore from "../../../stores/InterfaceStore";
import MapStore from "../../../stores/MapStore";
import useWindowResizeDetector from "../../../hooks/useWindowResizeDetector";

const Map = () => {
	const defaultPosition = {
		left: -320,
		top: 0
	};
	
	const defaultMapPosition = {
		left: 0,
		top: 0,
		scale: 1,
		dragging: false
	};
	
	const [position, setPosition] = useState(defaultPosition);
	const [mapPosition, setMapPosition] = useState(defaultMapPosition);
	const [mapOffset, setMapOffset] = useState({
		x: 0,
		y: 0
	});
	
	const [prev, setPrev] = useState({
		x: defaultMapPosition.left,
		y: defaultMapPosition.top
	});
	
	const ref = useRef<HTMLDivElement>(null);
	
	const onMapOffsetChange = debounce(() => {
		const offset = ref.current?.getBoundingClientRect();
		setMapOffset({
			x: offset?.x ?? 0,
			y: offset?.y ?? 0
		});
	}, 150);
	
	useWindowResizeDetector( {
		onResize: onMapOffsetChange,
		onScroll: onMapOffsetChange
	});
	
	useEffect(() => {
		const offset = ref.current?.getBoundingClientRect();
		
		setMapOffset({
			x: offset?.x ?? 0,
			y: offset?.y ?? 0
		});
	}, [ref]);
	
	const onClick: MouseEventHandler<SVGGElement> = useCallback((e) => {
		setPosition({
			left: e.pageX - mapOffset.x,
			top: e.clientY - mapOffset.y,
		});
	}, [mapOffset]);
	
	const onMouseMove: MouseEventHandler = useCallback((e) => {
		if (mapPosition.dragging) {
			const x = e.movementX;
			const y = e.movementY;
			
			setMapPosition({
				left: mapPosition.left + x,
				top: mapPosition.top + y,
				scale: mapPosition.scale,
				dragging: true
			});
		}
	}, [mapPosition]);
	
	const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(() => {
		if (!mapPosition.dragging) {
			setMapPosition({
				...mapPosition,
				dragging: true
			});
		}
	}, [mapPosition]);
	
	const onMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(() => {
		if (mapPosition.dragging) {
			setMapPosition({
				...mapPosition,
				dragging: false
			});
		}
	}, [mapPosition]);
	
	const onTouchStart: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
		if (!mapPosition.dragging) {
			setPrev({
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			});
			
			setMapPosition({
				...mapPosition,
				dragging: true
			});
		}
	}, [mapPosition]);
	
	const onTouchEnd: TouchEventHandler<HTMLDivElement> = useCallback(() => {
		if (mapPosition.dragging) {
			console.log("end");
			setMapPosition({
				...mapPosition,
				dragging: false
			});
		}
	}, [mapPosition]);
	
	const onTouchMove: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
		if (mapPosition.dragging) {
			const x = e.touches[0].clientX - prev.x;
			const y = e.touches[0].clientY - prev.y;
			
			setPrev({
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			});
			
			setMapPosition({
				left: mapPosition.left + x,
				top: mapPosition.top + y,
				scale: mapPosition.scale,
				dragging: true
			});
		}
	}, [mapPosition]);
	
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
				<div className={mapPosition.dragging ? `${css.dragger} ${css.dragging}` : `${css.dragger}`}
				     onMouseMove={onMouseMove}
				     onMouseUp={onMouseUp}
				     onMouseDown={onMouseDown}
				
				     onTouchStart={onTouchStart}
				     onTouchEnd={onTouchEnd}
				     onTouchMove={onTouchMove}
				>
					<Scaler/>
					
					<div className={css.floor}
					     style={{ left: mapPosition.left, top: mapPosition.top, transform: `scale(${MapStore.getScale()})` }}
					     ref={ref}>
						
						<First onClick={onClick}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default observer(Map);