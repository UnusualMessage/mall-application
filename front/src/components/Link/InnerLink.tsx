import { Link, LinkProps } from "react-router-dom";
import React from "react";
import classNames from "classnames";

import css from "./link.module.scss";

const InnerLink = ({ className, children, to, ...props }: Props) => {
    return (
        <Link className={classNames(css.default, className)} to={to} {...props}>
            {children}
        </Link>
    );
};

interface Props extends LinkProps {
    className?: string;
    children: React.ReactNode;
    to: string;
}

export default InnerLink;
