import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./filter.module.scss";

import Option from "./Option";

import Filterable from "../../types/Filterable";
import Category from "../../api/interfaces/category/Category";
import InterfaceStore from "../../stores/InterfaceStore";
import {useEffect} from "react";

const Filter = ({ store, categories }: Props ) => {
	const isFilterActive = InterfaceStore.isFilterActive();
	
	useEffect(() => {
		const category = categories[0] as Category | undefined;
		
		if (category) {
			store.setFilter(category.id, category.title);
		}
	}, []);
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.active]: isFilterActive
	});
	
	return(
		<div className={classes}>
			{categories.map(category => {
				return(
					<Option key={category.id}
					        count={store.getCountByCategoryId(category.id).toString()}
					        text={category.title} id={category.id} store={store}/>
				);
			})}
		</div>
	);
};

interface Props {
	store: Filterable,
	categories: Category[],
}

export default observer(Filter);