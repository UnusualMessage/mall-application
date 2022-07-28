import React, {FC, SVGProps} from "react";

import css from "./icon.module.scss";

const Icon: FC<Props> = ({ className, viewBox, icon, ...props }: Props) => {
	return(
		<svg className={`${css.default} ${className}`} viewBox={viewBox} {...props}>
			{icon}
		</svg>
	);
};

interface Props extends SVGProps<SVGSVGElement> {
	className: string,
	viewBox: string,
	icon: React.ReactNode
}

export default Icon;
