import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./discounts.module.scss";

import Filter from "../../../components/Filter";
import DiscountCards from "./DiscountCards";

import DiscountStore from "../../../stores/DiscountStore";
import CategoryStore from "../../../stores/CategoryStore";

const Discounts = () => {
	const [isFetching, setIsFetching] = useState(true);
	const categories = CategoryStore.get();
	
	useEffect(() => {
		const getCategories = async () => {
			await CategoryStore.getAsync("");
		};
		
		void getCategories();
		setIsFetching(false);
	}, []);
	
	if (isFetching) {
		return null;
	}
	
    return(
        <div className={classNames(css.wrapper)}>
            <Filter store={DiscountStore} categories={categories}/>
            <DiscountCards/>
        </div>

    );
};

export default observer(Discounts);