import {useMemo} from "react";
import classNames from "classnames";

import styles from "/src/components/styles.module.scss";
import css from "./home.module.scss";

import PicturesCarousel from "../../../components/PicturesCarousel";

import ShopStore from "../../../stores/ShopStore";
import EventStore from "../../../stores/EventStore";
import DiscountStore from "../../../stores/DiscountStore";
import getFirstBy from "../../../utils/getFirstBy";
import {discounts, events, shops} from "../../../data/breadcrumbs";

const Home = () => {
    const shopImages = useMemo(() => {
        return getFirstBy(10, ShopStore.get());
    }, []);
    
    const discountImages = useMemo(() => {
        return getFirstBy(10, DiscountStore.get());
    }, []);
    
    const eventsImages = useMemo(() => {
        return getFirstBy(6, EventStore.get());
    }, []);
    
    return(
        <div className={classNames(css.wrapper)}>
            <PicturesCarousel images={shopImages}
                              title={"Магазины"}
                              linkLabel={"Все отделы"}
                              to={shops.route}
                              borderColor={styles.redBorder}
                              rows={1}
                              cols={4}
            />
    
            <PicturesCarousel images={discountImages}
                              title={"Акции"}
                              linkLabel={"Все акции"}
                              to={discounts.route}
                              borderColor={styles.greenBorder}
                              rows={1}
                              cols={3}
            />
    
            <PicturesCarousel images={eventsImages}
                              title={"Новости"}
                              linkLabel={"Все новости"}
                              to={events.route}
                              borderColor={styles.blueBorder}
                              rows={3}
                              cols={2}
            />
        </div>
        
    );
};

export default Home;