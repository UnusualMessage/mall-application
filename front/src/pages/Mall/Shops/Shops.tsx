import {observer} from "mobx-react-lite";

import css from "./shops.module.scss";

import Filter from "../../../components/Filter/Filter";
import ShopCards from "./ShopCards";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";

const Shops = () => {
    return(
        <div className={`${css.wrapper}`}>
            <Filter store={ShopStore} categories={CategoryStore.getCategories()} className={`${css.filter}`}/>
            <ShopCards/>
        </div>
    );
};

export default observer(Shops);