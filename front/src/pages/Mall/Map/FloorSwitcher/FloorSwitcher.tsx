import {observer} from "mobx-react-lite";
import {useState} from "react";
import classNames from "classnames";

import css from "./switcher.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";

import MapStore from "../../../../stores/MapStore";

const FloorSwitcher = () => {
	const [switcher, setSwitcher] = useState(false);
	
	const onSwitcherShow = () => {
		setSwitcher(true);
	};
	
	const onFirstFloorSwitch = () => {
		MapStore.toFloor(1);
		setSwitcher(false);
	};
	
	const onSecondFloorSwitch = () => {
		MapStore.toFloor(2);
		setSwitcher(false);
	};
	
	return(
		<>
			{
				switcher ?
					<div className={classNames(css.wrapper)}>
						<Label text={"1 Этаж"}
						       className={classNames(css.item, label.mini, label.bold)}
						       onClick={onFirstFloorSwitch}/>
						
						<Label text={"2 Этаж"}
						       className={classNames(css.item, label.mini, label.bold)}
						       onClick={onSecondFloorSwitch}/>
					</div>
					:
					<div className={classNames(css.wrapper)} onClick={onSwitcherShow}>
						<Label text={`${MapStore.getFloor()} Этаж`}
						       className={classNames(css.item, label.mini, label.bold)}/>
					</div>
			}
		</>
	);
};

export default observer(FloorSwitcher);