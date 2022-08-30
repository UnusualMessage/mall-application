import classNames from "classnames";
import React from "react";

import css from "./index.module.scss";

import Scaler from "./Scaler";
import FloorSwitcher from "./FloorSwitcher";
import Schema from "./Schema";

const SchemaLayout = ({ children, readonly }: Props) => {
    return (
        <div className={classNames(css.wrapper)}>
            {children}
            <Scaler />
            <FloorSwitcher />
            <Schema readonly={readonly} />
        </div>
    );
};

interface Props {
    children?: React.ReactNode;
    readonly?: boolean;
}

export default SchemaLayout;
