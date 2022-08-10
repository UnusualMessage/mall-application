import debounce from "lodash/debounce";
import useWindowResizeDetector from "./useWindowResizeDetector";
import React, {useEffect, useState} from "react";

const useElementOffset = ({ targetRef }: Props): Response => {
	const [offset, setOffset] = useState({
		x: 0,
		y: 0
	});
	
	const onMapOffsetChange = debounce(() => {
		const offset = targetRef.current?.getBoundingClientRect();
		setOffset({
			x: offset?.x ?? 0,
			y: offset?.y ?? 0
		});
	}, 150);
	
	useWindowResizeDetector( {
		onResize: onMapOffsetChange,
		onScroll: onMapOffsetChange
	});
	
	useEffect(() => {
		const offset = targetRef.current?.getBoundingClientRect();
		
		setOffset({
			x: offset?.x ?? 0,
			y: offset?.y ?? 0
		});
	}, [targetRef]);
	
	return [offset, setOffset];
};

interface Props {
	targetRef: React.RefObject<HTMLDivElement>
}

type Response = [Offset, React.Dispatch<React.SetStateAction<Offset>>];

interface Offset {
	x: number,
	y: number
}


export default useElementOffset;