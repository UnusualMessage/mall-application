import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./filter.module.scss";

import Option from "./Option";

import Filterable from "../../types/Filterable";
import Category from "../../api/interfaces/category/Category";
import InterfaceStore from "../../stores/InterfaceStore";

const Filter = ({ store, categories }: Props ) => {
	const isFilterActive = InterfaceStore.isFilterActive();
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.active]: isFilterActive
	});
	
	const categoriesWithAll = [...categories];
	categoriesWithAll.unshift(...[{
		id: "1",
		title: "Все"
	}]);
	
	return(
		<div className={classes}>
			{categoriesWithAll.map(category => {
				return(
					<Option key={category.id}
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