import {observer} from "mobx-react-lite";

import css from "./switcher.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";

import MapStore from "../../../../stores/MapStore";
import {useState} from "react";

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
					<div className={css.wrapper}>
						<Label text={"1 Этаж"}
						       className={`${label.mini} ${label.bold} ${css.item}`}
						       onClick={onFirstFloorSwitch}/>
						
						<Label text={"2 Этаж"}
						       className={`${label.mini} ${label.bold} ${css.item}`}
						       onClick={onSecondFloorSwitch}/>
					</div>
					:
					<div className={css.wrapper} onClick={onSwitcherShow}>
						<Label text={`${MapStore.getFloor()} Этаж`}
						       className={`${label.mini} ${label.bold} ${css.item}`}/>
					</div>
			}
		</>
	);
};

export default observer(FloorSwitcher);