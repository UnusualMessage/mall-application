import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./map.module.scss";
import label from "/src/components/Label/label.module.scss";

import {Categories} from "./Category";
import Scaler from "./Scaler";
import FloorSwitcher from "./FloorSwitcher";
import Label from "../../../components/Label";

import InterfaceStore from "../../../stores/InterfaceStore";
import Schema from "../../../components/Schema";

const Map = () => {
	const onFilterSwitch = () => {
		InterfaceStore.switchMapFilter();
	};

	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.toolbox)}>
				<Label text={"Магазины"}
				       className={classNames(css.switcher, label.mini, label.upper)}
				       onClick={onFilterSwitch}/>
			</div>
			
			<div className={classNames(css.content)}>
				<Categories/>
				<Scaler/>
				<FloorSwitcher/>
				<Schema/>
			</div>
		</div>
	);
};

export default observer(Map);