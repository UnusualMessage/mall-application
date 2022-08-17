import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./categories.module.scss";

import {Category} from "./index";

import CategoryStore from "../../../../stores/CategoryStore";
import InterfaceStore from "../../../../stores/InterfaceStore";

const Categories = () => {
	const [isFetching, setIsFetching] = useState(true);
	
	const categories = CategoryStore.get();
	
	useEffect(() => {
		const getCategories = async () => {
			await CategoryStore.getAsync("");
		};
		
		void getCategories();
		setIsFetching(false);
	}, []);

	const classes = classNames({
		[css.wrapper]: true,
		[css.active]: InterfaceStore.isMapFilterActive()
	});
	
	if (isFetching) {
		return null;
	}
	
	return(
		<div className={classes}>
			{categories.map(category => {
				return(
					<Category category={category} key={category.id}/>
				);
			})}
		</div>
	);
};

export default observer(Categories);