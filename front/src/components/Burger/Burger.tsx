import {observer} from "mobx-react-lite";

import css from "./burger.module.scss";

import InterfaceStore from "../../stores/InterfaceStore";

const Burger = () => {
	const onMenuSwitch = () => {
		InterfaceStore.switchMenu();
	};
	
	let classes = css.wrapper;
	if (InterfaceStore.menuActive) {
		classes = `${css.wrapper} ${css.open}`;
	}
	
	return(
		<div className={classes} onClick={onMenuSwitch}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export default observer(Burger);