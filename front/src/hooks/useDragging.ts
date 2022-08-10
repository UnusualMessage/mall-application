import React, {useCallback, useEffect, useState} from "react";

const useDragging = ({ targetRef, defaultState }: Props): Response => {
	const [mapPosition, setMapPosition] = useState(defaultState);
	
	const [prev, setPrev] = useState({
		x: 0,
		y: 0
	});
	
	const onStart = useCallback(() => {
		if (!mapPosition.dragging) {
			setMapPosition({
				...mapPosition,
				dragging: true
			});
		}
	}, [mapPosition]);
	
	const onEnd = useCallback(() => {
		if (mapPosition.dragging) {
			setMapPosition({
				...mapPosition,
				dragging: false
			});
		}
	}, [mapPosition]);
	
	
	const onMouseMove = useCallback((e: MouseEvent) => {
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
	
	const onTouchStart = useCallback((e: TouchEvent) => {
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
	
	const onTouchMove = useCallback((e: TouchEvent) => {
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
	
	useEffect(() => {
		targetRef.current?.addEventListener("mousemove", onMouseMove);
		targetRef.current?.addEventListener("mousedown", onStart);
		targetRef.current?.addEventListener("mouseup", onEnd);
		targetRef.current?.addEventListener("mouseleave", onEnd);
		
		targetRef.current?.addEventListener("touchmove", onTouchMove, {passive: true});
		targetRef.current?.addEventListener("touchstart", onTouchStart, {passive: true});
		targetRef.current?.addEventListener("touchend", onEnd, {passive: true});
		
		return () => {
			targetRef.current?.removeEventListener("mousemove", onMouseMove);
			targetRef.current?.removeEventListener("mousedown", onStart);
			targetRef.current?.removeEventListener("mouseup", onEnd);
			targetRef.current?.removeEventListener("mouseleave", onEnd);
			
			targetRef.current?.removeEventListener("touchmove", onTouchMove);
			targetRef.current?.removeEventListener("touchstart", onTouchStart);
			targetRef.current?.removeEventListener("touchend", onEnd);
		};
	}, [targetRef, mapPosition]);
	
	return [mapPosition, setMapPosition];
};

interface Props {
	targetRef: React.RefObject<HTMLDivElement>
	defaultState: State
}

type Response = [State, React.Dispatch<React.SetStateAction<State>>];

interface State {
	left: number,
	top: number,
	dragging: boolean,
	scale: number
}

export default useDragging;