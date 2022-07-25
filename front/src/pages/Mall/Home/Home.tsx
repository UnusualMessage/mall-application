import {useMemo} from "react";

import label from "/src/components/Label/label.module.scss";
import css from "./home.module.scss";

import PicturesCarousel from "../../../components/PicturesCarousel";
import ShopStore from "../../../stores/ShopStore";

const Home = () => {
    const shopImages = useMemo(() => {
        return ShopStore.getFirstBy(10);
    }, []);
    
    return(
        <div className={`${css.wrapper}`}>
            <PicturesCarousel images={shopImages}
                              title={"Магазины"}
                              linkLabel={"Все отделы"}
                              to={"shops"}
                              borderColor={label.redBottom}
                              rows={1}
                              cols={4}
            />
    
            <PicturesCarousel images={shopImages}
                              title={"Акции"}
                              linkLabel={"Все акции"}
                              to={"discounts"}
                              borderColor={label.greenBottom}
                              rows={1}
                              cols={3}
            />
    
            <PicturesCarousel images={shopImages}
                              title={"Новости"}
                              linkLabel={"Все новости"}
                              to={"events"}
                              borderColor={label.blueBottom}
                              rows={3}
                              cols={2}
            />
        </div>
        
    );
};

export default Home;