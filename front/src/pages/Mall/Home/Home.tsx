import label from "/src/components/Label/label.module.scss";
import css from "./home.module.scss";

import PicturesCarousel from "../../../components/PicturesCarousel";

const Home = () => {
    const images = [
        {
            image: "/images/shops/befree.jpg",
            link: "shops/befree"
        },
    
        {
            image: "/images/shops/befree.jpg",
            link: "shops/befree"
        },
        
        {
            image: "/images/shops/befree.jpg",
            link: "shops/befree"
        },
    
        {
            image: "/images/shops/befree.jpg",
            link: "shops/befree"
        },
    
        {
            image: "/images/shops/befree.jpg",
            link: "shops/befree"
        },
        
        {
            image: "/images/shops/befree.jpg",
            link: "shops/befree"
        },
    ];
    
    return(
        <div className={`${css.wrapper}`}>
            <PicturesCarousel images={images}
                              title={"Магазины"}
                              linkLabel={"Все отделы"}
                              to={"shops"}
                              borderColor={label.redBottom}
                              rows={1}
                              cols={4}
            />
    
            <PicturesCarousel images={images}
                              title={"Акции"}
                              linkLabel={"Все акции"}
                              to={"discounts"}
                              borderColor={label.greenBottom}
                              rows={1}
                              cols={3}
            />
    
            <PicturesCarousel images={images}
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