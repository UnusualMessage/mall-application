import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./index.module.scss";
import label from "/src/components/Label/label.module.scss";

import {Categories} from "./Category";
import Label from "../../../components/Label";
import SchemaLayout from "../../../components/SchemaLayout";

import InterfaceStore from "../../../stores/InterfaceStore";

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
			
			<SchemaLayout>
				<Categories/>
			</SchemaLayout>

		</div>
	);
};

export default observer(Map);