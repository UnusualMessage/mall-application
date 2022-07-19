import {observer} from "mobx-react-lite";

import css from "./option.module.scss";
import label from "../../common/Label/label.module.scss";

import Label from "../../common/Label";
import Filterable from "../../../types/Filterable";

const Option = ({ count, text, store }: Props) => {
	let active = false;
	
	if (Number(count) === 0) {
		return null;
	} else {
		if (text === store.getFilter()) {
			active = true;
		}
	}
	
	const onClick = () => {
		store.setFilter(text);
	};
	
	let classes: string;
	
	if (active) {
		classes = `${css.wrapper} ${css.active}`;
	} else {
		classes = `${css.wrapper}`;
	}
	
	return(
		<div className={classes} onClick={active ? () => { return; } : onClick}>
			<Label classes={`${css.count} ${label.bold}`} text={count}/>
			<Label classes={`${css.name} ${label.mini}`} text={text}/>
		</div>
	);
};

interface Props {
	count: string,
	text: string,
	store: Filterable
}

export default observer(Option);