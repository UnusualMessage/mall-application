import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./index.module.scss";

import Filter from "../../../components/Filter";
import Loader from "../../../components/Loader";
import ShopCards from "./ShopCards";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";

const Shops = () => {
	const [isFetching, setIsFetching] = useState(true);
	
	const categories = CategoryStore.get();
	
	useEffect(() => {
		const getCategories = async () => {
			await CategoryStore.getAsync("");
			setIsFetching(false);
		};
		
		void getCategories();
	}, []);
	
	if (isFetching) {
		return <Loader/>;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			<Filter store={ShopStore} categories={categories}/>
			<ShopCards/>
		</div>
	);
};

export default observer(Shops);