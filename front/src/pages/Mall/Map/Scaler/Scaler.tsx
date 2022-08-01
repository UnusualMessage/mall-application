import {observer} from "mobx-react-lite";

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
		<div className={css.wrapper}>
			<div className={css.item} onClick={zoomIn}>
				<Icon className={""} viewBox={"0 0 20 20"} icon={icons.plus}/>
			</div>
			
			<div className={css.item} onClick={zoomOut}>
				<Icon className={""} viewBox={"0 0 20 20"} icon={icons.minus}/>
			</div>
		</div>
	);
};

export default observer(Scaler);