import {observer} from "mobx-react-lite";

import css from "./option.module.scss";
import label from "../../Label/label.module.scss";

import Filterable from "../../../types/Filterable";
import Label from "../../Label";

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
		window.scroll({top: 0, left: 0, behavior: "smooth" });
		store.setFilter(text);
	};
	
	let className: string;
	
	if (active) {
		className = `${css.wrapper} ${css.active}`;
	} else {
		className = `${css.wrapper}`;
	}
	
	return(
		<div className={className} onClick={active ? () => { return; } : onClick}>
			<Label text={count} className={`${css.count} ${label.default} ${label.bold}`}/>
			<Label text={text} className={`${css.name} ${label.mini}`}/>
		</div>
	);
};

interface Props {
	count: string,
	text: string,
	store: Filterable
}

export default observer(Option);