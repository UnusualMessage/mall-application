import React, { useCallback, useRef } from "react";
import classNames from "classnames";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";
import css from "./index.module.scss";

import Label from "../Label";

import useElementHider from "../../hooks/useElementHider";

const Hider = ({ children, defaultHeight, className }: Props) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const [hider, setHider] = useElementHider<HTMLDivElement>({
        targetRef,
        defaultHeight,
    });

    const onClick = useCallback(() => {
        const hidden = !hider.hidden;

        if (hider.hidden) {
            setHider({
                maxHeight: targetRef.current?.scrollHeight.toString() + "px",
                hidden: hidden,
            });
        } else {
            setHider({
                maxHeight: defaultHeight.toString() + "px",
                hidden: hidden,
            });
        }
    }, [hider.hidden, defaultHeight, targetRef]);

    return (
        <div className={classNames(css.wrapper, className)}>
            <div
                className={classNames(css.content, {
                    [css.hidden]: hider.hidden,
                })}
                ref={targetRef}
                style={{ maxHeight: hider.maxHeight }}
            >
                {children}
            </div>

            <Label
                className={classNames(css.more, label.default, link.underlined)}
                text={hider.hidden ? "Показать" : "Спрятать"}
                onClick={onClick}
            />
        </div>
    );
};

interface Props {
    className: string;
    children: React.ReactNode;
    defaultHeight: number;
}

export default Hider;
