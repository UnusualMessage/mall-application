import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Tooltip } from "antd";

const Button = ({ icon, active, label, ...props }: Props) => {
    return (
        <Tooltip title={label}>
            <span
                style={
                    active
                        ? {
                              color: "#ff9a00",
                              cursor: "pointer",
                              fontSize: "20px",
                          }
                        : { cursor: "pointer", fontSize: "20px" }
                }
                {...props}
            >
                {icon}
            </span>
        </Tooltip>
    );
};

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    icon: React.ReactNode;
    active: boolean;
    label: string;
}

export default Button;
