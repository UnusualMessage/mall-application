import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./index.module.scss";

import MapStore from "../../../stores/MapStore";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const Scaler = () => {
	const zoomIn = () => {
		MapStore.zoomIn();
	};
	
	const zoomOut = () => {
		MapStore.zoomOut();
	};
	
	return(
		<div className={classNames(css.wrapper)}>
			<PlusOutlined onClick={zoomIn} className={css.item}/>
			<MinusOutlined onClick={zoomOut} className={css.item}/>
		</div>
	);
};

export default observer(Scaler);