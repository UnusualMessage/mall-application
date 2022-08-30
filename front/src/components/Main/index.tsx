import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Skeleton, Typography } from "antd";

import css from "./index.module.scss";

import Breadcrumbs from "../Breadcrumbs";

import NavigationStore from "../../stores/NavigationStore";

const Main = ({ children }: Props) => {
    const location = useLocation();
    const [isFetching, setIsFetching] = useState(true);

    const breadcrumbs = NavigationStore.get();

    useEffect(() => {
        const setupRoutes = async () => {
            setIsFetching(true);
            await NavigationStore.getAsync();
            NavigationStore.toNext(location.pathname);
            setIsFetching(false);
        };

        void setupRoutes();
    }, [location]);

    return (
        <main className={classNames(css.wrapper)}>
            <div className={classNames(css.inner)}>
                {isFetching ? (
                    <Skeleton.Input />
                ) : (
                    <Typography.Title className={css.title} level={1}>
                        {breadcrumbs[breadcrumbs.length - 1].name}
                    </Typography.Title>
                )}

                {isFetching ? (
                    <Skeleton.Input />
                ) : (
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                )}

                {children}
            </div>
        </main>
    );
};

interface Props {
    children: React.ReactNode;
}

export default observer(Main);
