import {useMemo} from "react";

import styles from "/src/components/styles.module.scss";
import css from "./home.module.scss";

import PicturesCarousel from "../../../components/PicturesCarousel";
import ShopStore from "../../../stores/ShopStore";
import EventStore from "../../../stores/EventStore";
import DiscountStore from "../../../stores/DiscountStore";
import getFirstBy from "../../../utils/getFirstBy";

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
        <div className={`${css.wrapper}`}>
            <PicturesCarousel images={shopImages}
                              title={"Магазины"}
                              linkLabel={"Все отделы"}
                              to={"shops"}
                              borderColor={styles.redBorder}
                              rows={1}
                              cols={4}
            />
    
            <PicturesCarousel images={discountImages}
                              title={"Акции"}
                              linkLabel={"Все акции"}
                              to={"discounts"}
                              borderColor={styles.greenBorder}
                              rows={1}
                              cols={3}
            />
    
            <PicturesCarousel images={eventsImages}
                              title={"Новости"}
                              linkLabel={"Все новости"}
                              to={"events"}
                              borderColor={styles.blueBorder}
                              rows={3}
                              cols={2}
            />
        </div>
        
    );
};

export default Home;