import React, {useEffect, useRef, useState} from "react";

const useTooltipPosition = <T extends SVGElement>({ defaultPosition }: Props): [Position, React.RefObject<T>] => {
	const [position, setPosition] = useState(defaultPosition);
	const ref = useRef<T>(null);
	
	const onClick = (e: MouseEvent) => {
		const x = e.pageX;
		const y = e.pageY;
		
		setPosition({
			left: x - 60,
			top: y - 80,
		});
	};
	
	useEffect(() => {
		ref.current?.addEventListener("click", onClick);
		console.log(ref.current);
		return () => {
			ref.current?.removeEventListener("click", onClick);
		};
	}, [ref]);
	
	return [position, ref];
};

interface Props {
	defaultPosition: Position
}

interface Position {
	left: number,
	top: number
}

export default useTooltipPosition;
