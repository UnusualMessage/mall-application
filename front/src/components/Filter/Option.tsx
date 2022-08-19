import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./option.module.scss";
import label from "../Label/label.module.scss";

import Label from "../Label";

import Filterable from "../../types/Filterable";
import InterfaceStore from "../../stores/InterfaceStore";

const Option = ({ count, text, store, id }: Props) => {
	let active = false;
	
	if (Number(count) === 0) {
		return null;
	} else {
		if (id === store.getFilter()) {
			active = true;
		}
	}
	
	const onClick = () => {
		store.setFilter(id, text);
		InterfaceStore.switchFilter();
	};
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.active]: active
	});
	
	return(
		<div className={classes} onClick={active ? () => { return; } : onClick}>
			<Label text={count} className={`${css.count} ${label.default} ${label.bold}`}/>
			<Label text={text} className={`${css.name} ${label.mini}`}/>
		</div>
	);
};

interface Props {
	count: string,
	text: string,
	id: string,
	store: Filterable
}

export default observer(Option);