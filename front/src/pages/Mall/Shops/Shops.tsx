import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./shops.module.scss";

import Filter from "../../../components/Filter/Filter";
import ShopCards from "./ShopCards";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";

const Shops = () => {
	const [isLoading, setIsLoading] = useState(true);
	
	const categories = CategoryStore.get();

	useEffect(() => {
		const getCategories = async () => {
			await CategoryStore.getAsync("");
			setIsLoading(false);
		};
		
		void getCategories();
	}, []);
	
	if (isLoading) {
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