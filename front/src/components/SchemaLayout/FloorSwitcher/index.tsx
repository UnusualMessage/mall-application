import { observer } from "mobx-react-lite";
import { useState } from "react";
import classNames from "classnames";

import css from "./index.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../Label";

import MapStore from "../../../stores/MapStore";

const FloorSwitcher = () => {
    const [switcher, setSwitcher] = useState(false);

    const onSwitcherShow = () => {
        setSwitcher(true);
    };

    const onFloorSwitch = (floor: 1 | 2) => {
        MapStore.toFloor(floor);
        setSwitcher(false);
    };

    return (
        <>
            {switcher ? (
                <div className={classNames(css.wrapper)}>
                    <Label
                        text={"1 Этаж"}
                        className={classNames(css.item, label.mini, label.bold)}
                        onClick={() => onFloorSwitch(1)}
                    />

                    <Label
                        text={"2 Этаж"}
                        className={classNames(css.item, label.mini, label.bold)}
                        onClick={() => onFloorSwitch(2)}
                    />
                </div>
            ) : (
                <div
                    className={classNames(css.wrapper)}
                    onClick={onSwitcherShow}
                >
                    <Label
                        text={`${MapStore.getFloor()} Этаж`}
                        className={classNames(css.item, label.mini, label.bold)}
                    />
                </div>
            )}
        </>
    );
};

export default observer(FloorSwitcher);
