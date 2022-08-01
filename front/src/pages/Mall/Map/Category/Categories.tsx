import {observer} from "mobx-react-lite";

import css from "./categories.module.scss";

import {Category} from "./index";

import CategoryStore from "../../../../stores/CategoryStore";
import InterfaceStore from "../../../../stores/InterfaceStore";

const Categories = () => {
	const categories = CategoryStore.getCategories();
	
	let classes = `${css.wrapper}`;
	if (InterfaceStore.isMapFilterActive()) {
		classes = `${css.wrapper} ${css.active}`;
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