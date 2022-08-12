import {PropsWithChildren, forwardRef} from "react";

import css from "./list.module.scss";

export enum ListType {
	ordered,
	unordered
}

const List = forwardRef<HTMLOListElement, Props>((props, ref) => {
	if (props.type === ListType.ordered) {
		return (
			<ol className={css.wrapper} ref={ref}>
				{props.children}
			</ol>
		);
	} else {
		return (
			<ul className={css.wrapper} ref={ref}>
				{props.children}
			</ul>
		);
	}
});

interface Props extends PropsWithChildren {
	type: ListType
}

List.displayName = "List";

export default List;