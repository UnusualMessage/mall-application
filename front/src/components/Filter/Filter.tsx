import css from "./filter.module.scss";

import Option from "./FilterOption/Option";

import Filterable from "../../types/Filterable";
import Category from "../../api/interfaces/category/Category";
import {observer} from "mobx-react-lite";

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

export default observer(Filter);