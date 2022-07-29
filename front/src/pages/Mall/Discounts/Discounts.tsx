import {observer} from "mobx-react-lite";

import css from "./discounts.module.scss";

import Filter from "../../../components/Filter";
import DiscountCards from "./DiscountCards";

import DiscountStore from "../../../stores/DiscountStore";
import CategoryStore from "../../../stores/CategoryStore";

const Discounts = () => {
    return(
        <div className={`${css.wrapper}`}>
            <Filter store={DiscountStore} categories={CategoryStore.getCategories()}/>
            <DiscountCards/>
        </div>

    );
};

export default observer(Discounts);