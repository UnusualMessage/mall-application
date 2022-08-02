import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./scaler.module.scss";

import Icon from "../../../../components/Icon";

import icons from "../../../../data/icons";
import MapStore from "../../../../stores/MapStore";

const Scaler = () => {
	const zoomIn = () => {
		MapStore.zoomIn();
	};
	
	const zoomOut = () => {
		MapStore.zoomOut();
	};
	
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.item)} onClick={zoomIn}>
				<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.plus}/>
			</div>
			
			<div className={classNames(css.item)} onClick={zoomOut}>
				<Icon className={classNames()} viewBox={"0 0 20 20"} icon={icons.minus}/>
			</div>
		</div>
	);
};

export default observer(Scaler);