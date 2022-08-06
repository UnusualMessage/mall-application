import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import classNames from "classnames";

import css from "./button.module.scss";

const Button = ({ text, disabled, ...props }: Props) => {
	const classes = classNames({
		[css.wrapper]: true,
		[css.disabled]: disabled
	});
	
	return (
		<button type={"submit"} className={classes} {...props}
		        onClick={disabled ? (e) => { e.preventDefault(); } : props.onClick}>
			{text}
		</button>
	);
};

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	text: string,
	disabled: boolean
}

export default Button;