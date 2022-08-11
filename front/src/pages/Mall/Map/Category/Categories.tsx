import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./categories.module.scss";

import {Category} from "./index";

import CategoryInterface from "../../../../api/interfaces/category/Category";
import CategoryStore from "../../../../stores/CategoryStore";
import InterfaceStore from "../../../../stores/InterfaceStore";

const Categories = () => {
	const [categories, setCategories] = useState<CategoryInterface[]>();
	
	useEffect(() => {
		const getCategories = async () => {
			const categories = await CategoryStore.getAsync("");
			setCategories(categories);
		};
		
		void getCategories();
	}, []);

	const classes = classNames({
		[css.wrapper]: true,
		[css.active]: InterfaceStore.isMapFilterActive()
	});
	
	if (!categories) {
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