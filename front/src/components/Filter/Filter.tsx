import css from "./filter.module.scss";

import Option from "./FilterOption/Option";

import Filterable from "../../api/interfaces/Filterable";
import Category from "../../api/interfaces/category/Category";

const Filter = ({ store, categories }: Props ) => {
	return(
		<div className={`${css.filter}`}>
			{categories.map(category => {
				return(
					<Option key={category.title} count={category.count.toString()} text={category.title} store={store}/>
				);
			})}
		</div>
	);
};

interface Props {
	store: Filterable,
	categories: Category[]
}

export default Filter;