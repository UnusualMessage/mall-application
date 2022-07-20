import {Map, Placemark, YMaps} from "react-yandex-maps";

import css from "./info.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../components/Label";

import contacts from "../../../data/contacts";

const Info = () => {
	return(
		<div className={`${css.wrapper}`}>
			<YMaps>
				<Map style={{ width: "100%", height: "700px" }} defaultState={{ center: [54.35079996381128,38.261544220237724], zoom: 17 }}>
					<Placemark defaultGeometry={[54.35079996381128,38.261544220237724]}/>
				</Map>
			</YMaps>

			<div className={`${css.about}`}>
				<div className={`${css.info}`}>
					<Label text={contacts.city} className={`${label.bold}`}/>
					<Label text={contacts.street} className={`${label.mini}`}/>
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.schedule} className={`${label.bold}`}/>
					<Label text={"Время работы"} className={`${label.mini}`}/>
				</div>
				
				<div className={`${css.info}`}>
					<Label text={contacts.phone} className={`${label.bold}`}/>
					<Label text={"Контактный телефон"} className={`${label.mini}`}/>
				</div>
			</div>
		</div>
	);
};

export default Info;