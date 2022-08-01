import {MouseEventHandler} from "react";

import css from "./floor.module.scss";

import {Cells} from "../Cell";

const First = ({ onClick }: Props) => {
	return(
		<svg className={css.wrapper} viewBox="0 0 992 576">
			<path className="st0" d="M0,0v470h510v106h289.81C905.95,576,992,489.95,992,383.81V0H0z"/>
			
			<Cells onClick={onClick}/>
			
			<g>
				<rect x="825" y="10" fill={"#9A9996"} width="85" height="10"/>
				<polygon fill={"#77767B"} points="825,10 820,15 820,25 905,25 910,20 825,20 	"/>
			</g>
			
			<g>
				<path fill={"#FF7800"} d="M580,470v90h-55v-90v0H580z"/>
				<path fill={"#E66100"} d="M525,560h55l-10,10h-55l0,0v-90l10-10V560z"/>
				<path fill={"#252525"} d="M572,517v10h-10h-10h-10h-10v-25h10v5h10v5h10v5H572z"/>
			</g>
			
			<g>
				<path fill={"#FF7800"} d="M800,345v50H685v-50H800z"/>
				<path fill={"#E66100"} d="M685,395h115l-10,10H675v-50l10-10V395z"/>
				<path fill={"#252525"} d="M760,370v10h-10h-10h-10h-10v-25h10v5h10v5h10v5H760z"/>
			</g>
			
			<g>
				<path fill={"#FF7800"} d="M75,10v75H20V10H75z"/>
				<path fill={"#E66100"} d="M20,85h55L65,95H10V20l10-10V85z"/>
				<path fill={"#252525"} d="M68,50v10H58H48H38H28V35h10v5h10v5h10v5H68z"/>
			</g>
			
			<g>
				<path fill={"#FF7800"} d="M980,10v75h-55V10H980z"/>
				<path fill={"#E66100"} d="M925,85h55l-10,10h-55V20l10-10V85z"/>
				<path fill={"#252525"} d="M972,50v10h-10h-10h-10h-10V35h10v5h10v5h10v5H972z"/>
			</g>
		</svg>
	);
};

interface Props {
	onClick: MouseEventHandler
}


export default First;