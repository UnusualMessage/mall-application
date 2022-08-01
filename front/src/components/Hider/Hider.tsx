import React, {useRef} from "react";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";
import css from "./hider.module.scss";

import Label from "../Label";

import useElementHider from "../../hooks/useElementHider";

const Hider = ({ children, defaultHeight, className }: Props) => {
	const targetRef = useRef<HTMLDivElement>(null);
	
	const [hider, setHider] = useElementHider<HTMLDivElement>({ targetRef, defaultHeight });
	
	const onClick = () => {
		const hidden = !hider.hidden;
		
		if (hider.hidden) {
			setHider({
				maxHeight: targetRef.current?.scrollHeight.toString() + "px",
				hidden: hidden
			});
		} else {
			setHider({
				maxHeight: defaultHeight.toString() + "px",
				hidden: hidden
			});
		}
	};
	
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