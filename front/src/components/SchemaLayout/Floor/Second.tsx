import classNames from "classnames";

import css from "./index.module.scss";

import {Cells} from "../Cells";

const Second = ({ readonly }: Props) => {
	return (
		<svg className={classNames(css.wrapper)} viewBox="0 0 992 576">
			<path fill="#dfdfdf" d="M0,0v470h510v106h289.8C906,576,992,490,992,383.8V0H0z M992,150h-22V0h22V150z"/>
			
			<Cells readonly={readonly}/>
			
			<g>
				<path fill="#FF7800" d="M75,10v75H20V10H75z"/>
				<path fill="#E66100" d="M20,85h55L65,95H10V20l10-10V85z"/>
				<path fill="#252525" d="M68,50v10H58H48H38H28V35h10v5h10v5h10v5H68z"/>
			</g>
			<g>
				<path fill="#FF7800" d="M960,10v75h-55V10H960z"/>
				<path fill="#E66100" d="M905,85h55l-10,10h-55V20l10-10V85z"/>
				<path fill="#252525" d="M952,50v10h-10h-10h-10h-10V35h10v5h10v5h10v5H952z"/>
			</g>
			<g>
				<path fill="#FF7800" d="M580,470v90h-55v-90l0,0H580z"/>
				<path fill="#E66100" d="M525,560h55l-10,10h-55l0,0v-90l10-10V560z"/>
				<path fill="#252525" d="M572,517v10h-10h-10h-10h-10v-25h10v5h10v5h10v5H572z"/>
			</g>
			<g>
				<path fill="#FF7800" d="M800,345v50H685v-50H800z"/>
				<path fill="#E66100" d="M685,395h115l-10,10H675v-50l10-10V395z"/>
				<path fill="#252525" d="M760,370v10h-10h-10h-10h-10v-25h10v5h10v5h10v5H760z"/>
			</g>
			<g>
				<path fill="#9A9996" d="M890,20h-80V10h80V20z"/>
				<path fill="#77767B" d="M810,20h80l-5,5h-80L810,20z M805,25l5-5V10l-5,5V25z"/>
			</g>
			<g>
				<path fill="#9A9996" d="M135,195H20v-25h115V195z"/>
				<path fill="#77767B" d="M10,180l10-10l0,25l-10,10L10,180z M135,195H20l-10,10h115L135,195z"/>
			</g>
			<g>
				<path fill="#9A9996" d="M200,10h115v70H200V10z"/>
				<path fill="#77767B" d="M190,20l10-10l0,70l-10,10L190,20z M315,80H200l-10,10h115L315,80z"/>
			</g>
			<g>
				<path fill="#9A9996" d="M335,10h120v70H335V10z"/>
				<path fill="#77767B" d="M325,20l10-10l0,70l-10,10L325,20z M455,80H335l-10,10h120L455,80z"/>
			</g>
			<g>
				<path fill="#9A9996" d="M950,100h10v45h-10V100z"/>
				<path fill="#77767B" d="M945,105l5-5v45l-5,5V105z M945,150h10l5-5h-10L945,150z"/>
			</g>
			<g>
				<path fill="#FF7800" d="M185,80H90V10h95V80z"/>
				<path fill="#E66100" d="M80,20l10-10l0,70L80,90L80,20z M80,90h95l10-10H90L80,90z"/>
			</g>
		</svg>
	);
};

interface Props {
	readonly?: boolean
}

export default Second;