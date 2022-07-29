import {observer} from "mobx-react-lite";

import css from "./filter.module.scss";

import Option from "./FilterOption/Option";

import Filterable from "../../types/Filterable";
import Category from "../../api/interfaces/category/Category";
import InterfaceStore from "../../stores/InterfaceStore";

const Filter = ({ store, categories }: Props ) => {
	const isFilterActive = InterfaceStore.isFilterActive();
	
	let classes = `${css.wrapper}`;
	if (isFilterActive) {
		classes = `${css.wrapper} ${css.active}`;
	}
	
	return(
		<div className={classes}>
			{categories.map(category => {
				return(
					<Option key={category.title}
					        count={store.getCountByCategoryId(category.id).toString()}
					        text={category.title} store={store}/>
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