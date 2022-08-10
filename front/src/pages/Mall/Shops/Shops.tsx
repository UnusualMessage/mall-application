import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./shops.module.scss";

import Filter from "../../../components/Filter/Filter";
import ShopCards from "./ShopCards";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";

const Shops = () => {
    return(
        <div className={classNames(css.wrapper)}>
            <Filter store={ShopStore} categories={CategoryStore.get()}/>
            <ShopCards/>
        </div>
    );
};

export default observer(Shops);