import { useEffect, useState } from "react";
import classNames from "classnames";
import { Skeleton } from "antd";

import styles from "/src/components/styles.module.scss";
import css from "./index.module.scss";

import PicturesCarousel from "../../../components/PicturesCarousel";

import ShopStore from "../../../stores/ShopStore";
import EventStore from "../../../stores/EventStore";
import DiscountStore from "../../../stores/DiscountStore";

const Home = () => {
    const [isFetching, setIsFetching] = useState(true);

    const shops = ShopStore.get();
    const discounts = DiscountStore.get();
    const events = EventStore.get();

    useEffect(() => {
        const get = async () => {
            await ShopStore.getAsync("Page=1&PageSize=10");
            await DiscountStore.getAsync("Page=1&PageSize=10");
            await EventStore.getAsync("Page=1&PageSize=6");
            setIsFetching(false);
        };

        void get();
    }, []);

    return (
        <div className={classNames(css.wrapper)}>
            {isFetching ? (
                <Skeleton active />
            ) : (
                <PicturesCarousel
                    items={shops}
                    title={"Магазины"}
                    linkLabel={"Все отделы"}
                    to={"shops"}
                    borderColor={styles.redBorder}
                    rows={1}
                    cols={4}
                />
            )}

            {isFetching ? (
                <Skeleton active />
            ) : (
                <PicturesCarousel
                    items={discounts}
                    title={"Акции"}
                    linkLabel={"Все акции"}
                    to={"discounts"}
                    borderColor={styles.greenBorder}
                    rows={1}
                    cols={3}
                />
            )}

            {isFetching ? (
                <Skeleton active />
            ) : (
                <PicturesCarousel
                    items={events}
                    title={"Новости"}
                    linkLabel={"Все новости"}
                    to={"events"}
                    borderColor={styles.blueBorder}
                    rows={3}
                    cols={2}
                />
            )}
        </div>
    );
};

export default Home;
