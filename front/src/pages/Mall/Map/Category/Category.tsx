import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import css from "./category.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";
import Icon from "../../../../components/Icon";
import Loader from "../../../../components/Loader";
import { Shops } from "../Shop";

import ShopStore from "../../../../stores/ShopStore";
import { Category } from "../../../../api/interfaces/category";
import icons from "../../../../data/icons";
import useElementHider from "../../../../hooks/useElementHider";

const Category = ({ category }: Props) => {
    const [isFetching, setIsFetching] = useState(true);
    const defaultHeight = 0;

    const shops = ShopStore.get();

    useEffect(() => {
        const getShops = async () => {
            setIsFetching(true);
            await ShopStore.getAsync(`Filters=CategoryId==${category.id}`);
            setIsFetching(false);
        };

        void getShops();
    }, [category.id]);

    const targetRef = useRef<HTMLDivElement>(null);
    const [hider, setHider] = useElementHider({ targetRef, defaultHeight });

    if (isFetching) {
        return <Loader />;
    }

    if (shops.length === 0) {
        return null;
    }

    const onClick = () => {
        const hidden = !hider.hidden;
        if (hider.hidden) {
            setHider({
                maxHeight: targetRef.current?.scrollHeight + "px",
                hidden: hidden,
            });
        } else {
            setHider({
                maxHeight: defaultHeight + "px",
                hidden: hidden,
            });
        }
    };

    const classes = classNames({
        [css.icon]: true,
        [css.active]: !hider.hidden,
    });

    return (
        <div className={classNames(css.wrapper)}>
            <div className={classNames(css.header)} onClick={onClick}>
                <div className={classNames(css.title)}>
                    <Label
                        className={classNames(label.default, label.bold)}
                        text={ShopStore.getCountByCategoryId(
                            category.id
                        ).toString()}
                    />
                    <Label
                        className={classNames(label.default)}
                        text={category.title}
                    />
                </div>

                <div className={classes}>
                    <Icon
                        className={classNames()}
                        viewBox={"0 0 512 512"}
                        icon={icons.menu}
                    />
                </div>
            </div>

            <div
                className={classNames(css.list)}
                ref={targetRef}
                style={{ maxHeight: hider.maxHeight }}
            >
                <Shops shops={shops} />
            </div>
        </div>
    );
};

interface Props {
    category: Category;
}

export default observer(Category);
