import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./shops.module.scss";

import Filter from "../../../components/Filter/Filter";
import ShopCards from "./ShopCards";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";
import Category from "../../../api/interfaces/category/Category";

const Shops = () => {
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
            <Filter store={ShopStore} categories={categories}/>
            <ShopCards/>
        </div>
    );
};

export default observer(Shops);