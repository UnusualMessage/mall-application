import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {Tooltip} from "antd";

const Button = ({ icon, active, ...props }: Props) => {
	return (
		<Tooltip title="Кнопка редактора">
			<span style={active ?
				{ color: "#ff9a00", cursor: "pointer", fontSize: "20px" } :
				{ cursor: "pointer", fontSize: "20px" }} {...props}
			>
				{icon}
			</span>
		</Tooltip>
	);
};

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: React.ReactNode,
	active: boolean
}

export default Button;