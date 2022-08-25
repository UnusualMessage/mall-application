import classNames from "classnames";
import {observer} from "mobx-react-lite";

import css from "./index.module.scss";

import InterfaceStore from "../../../stores/InterfaceStore";

const Burger = () => {
	const onMenuSwitch = () => {
		InterfaceStore.switchMenu();
	};
	
	const classes = classNames({
		[css.wrapper]: true,
		[css.open]: InterfaceStore.isMenuActive()
	});
	
	return(
		<div className={classes} onClick={onMenuSwitch}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export default observer(Burger);