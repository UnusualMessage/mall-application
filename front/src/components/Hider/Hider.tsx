import React, {useCallback, useRef, useState} from "react";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";
import css from "./hider.module.scss";

import Label from "../Label";
import {useResizeDetector} from "react-resize-detector";

const Hider = ({ children, defaultHeight, className }: Props) => {
	const [hider, setHider] = useState({
		maxHeight: defaultHeight.toString() + "px",
		hidden: true
	});
	
	const targetRef = useRef<HTMLDivElement>(null);
	
	const onResize = useCallback(() => {
		if (!hider.hidden) {
			setHider({
				maxHeight: targetRef.current?.scrollHeight + "px",
				hidden: hider.hidden
			});
		}
	}, [hider.hidden]);
	
	useResizeDetector({targetRef, onResize });
	
	const onClick = useCallback(() => {
		if (hider.hidden) {
			setHider({
				maxHeight: targetRef.current?.scrollHeight + "px",
				hidden: !hider.hidden
			});
		} else {
			setHider({
				maxHeight: "230px",
				hidden: !hider.hidden
			});
		}
	}, [hider]);
	
	let buttonText = "Показать";
	if (!hider.hidden) {
		buttonText = "Спрятать";
	}
	
	return(
		<div className={`${css.wrapper} ${className}`}>
			<div className={`${css.content} ${hider.hidden ? css.hidden : ""}`}
			     ref={targetRef}
			     style={{maxHeight: hider.maxHeight}}>
				
				{children}
			</div>
			
			<Label className={`${css.more} ${label.default} ${link.underlined}`}
			       text={buttonText}
			       onClick={onClick}/>
		</div>
	);
};

interface Props {
	className: string,
	children: React.ReactNode
	defaultHeight: number
}

export default Hider;