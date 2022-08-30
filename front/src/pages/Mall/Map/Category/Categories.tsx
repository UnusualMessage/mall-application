import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useEffect, useState } from "react";

import css from "./categories.module.scss";

import { Category } from "./index";
import Loader from "../../../../components/Loader";

import CategoryStore from "../../../../stores/CategoryStore";
import InterfaceStore from "../../../../stores/InterfaceStore";

const Categories = () => {
    const [isFetching, setIsFetching] = useState(true);

    const categories = CategoryStore.get();

    useEffect(() => {
        const getCategories = async () => {
            await CategoryStore.getAsync("");
            setIsFetching(false);
        };

        void getCategories();
    }, []);

    const classes = classNames({
        [css.wrapper]: true,
        [css.active]: InterfaceStore.isMapFilterActive(),
    });

    const element = isFetching ? (
        <Loader />
    ) : (
        categories.map((category) => (
            <Category category={category} key={category.id} />
        ))
    );

    return <div className={classes}>{element}</div>;
};

export default observer(Categories);
