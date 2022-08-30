import React, {useCallback, useState} from "react";
import {useResizeDetector} from "react-resize-detector";

const useElementHider = <T extends HTMLElement>({ targetRef, defaultHeight }: Props<T>): Response => {
	const [hider, setHider] = useState({
		maxHeight: defaultHeight.toString() + "px",
		hidden: true
	});
	const onResize = useCallback(() => {
		if (!hider.hidden) {
			setHider({
				maxHeight: targetRef.current?.scrollHeight + "px",
				hidden: hider.hidden
			});
		}
	}, [hider.hidden]);
	
	useResizeDetector({ targetRef, onResize, handleWidth: true, handleHeight: false });
	
	return [hider, setHider];
};

interface Props<T> {
	targetRef: React.RefObject<T>,
	defaultHeight: number
}

type Response = [Hider, React.Dispatch<React.SetStateAction<Hider>>];

interface Hider {
	maxHeight: string,
	hidden: boolean
}

export default useElementHider;