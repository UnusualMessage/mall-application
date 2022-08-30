import React, { SVGProps } from "react";
import classNames from "classnames";

import css from "./icon.module.scss";

const Icon = ({ className, viewBox, icon, ...props }: Props) => {
    return (
        <svg
            className={classNames(css.default, className)}
            viewBox={viewBox}
            {...props}
        >
            {icon}
        </svg>
    );
};

interface Props extends SVGProps<SVGSVGElement> {
    className: string;
    viewBox: string;
    icon: React.ReactNode;
}

export default Icon;
