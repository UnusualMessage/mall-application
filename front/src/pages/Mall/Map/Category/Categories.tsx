import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./categories.module.scss";

import {Category} from "./index";

import CategoryStore from "../../../../stores/CategoryStore";
import InterfaceStore from "../../../../stores/InterfaceStore";

const Categories = () => {
	const categories = CategoryStore.get();

	const classes = classNames({
		[css.wrapper]: true,
		[css.active]: InterfaceStore.isMapFilterActive()
	});
	
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