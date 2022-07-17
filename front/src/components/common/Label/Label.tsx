import css from "./label.module.scss";
import React from "react";

const Label = ({ text, classes, onClick }: Props) => {
	return(
		<span className={`${css.default} ${classes}`} onClick={onClick}>
			{text}
		</span>
	);
};

interface Props {
	text: string,
	classes: string,
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export default Label;