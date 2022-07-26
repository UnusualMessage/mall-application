import {observer} from "mobx-react-lite";

import css from "./filter.module.scss";

import Option from "./FilterOption/Option";

import Filterable from "../../types/Filterable";
import Category from "../../api/interfaces/category/Category";

const Filter = ({ store, categories, className }: Props ) => {
	return(
		<div className={`${css.filter} ${className}`}>
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
	className: string
}

export default observer(Filter);