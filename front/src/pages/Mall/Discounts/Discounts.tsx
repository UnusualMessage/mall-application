import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./discounts.module.scss";

import Filter from "../../../components/Filter";
import DiscountCards from "./DiscountCards";

import DiscountStore from "../../../stores/DiscountStore";
import CategoryStore from "../../../stores/CategoryStore";
import Category from "../../../api/interfaces/category/Category";

const Discounts = () => {
	const [categories, setCategories] = useState<Category[]>();
	
	useEffect(() => {
		const getCategories = async () => {
			const categories = await CategoryStore.getAsync("");
			setCategories(categories);
		};
		
		void getCategories();
	}, []);
	
	if (!categories) {
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