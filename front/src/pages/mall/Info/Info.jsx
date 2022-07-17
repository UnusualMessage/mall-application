import {Map, Placemark, YMaps} from "react-yandex-maps";

import css from "./info.module.scss";
import label from "../../../components/common/Label/label.module.scss";

import Label from "../../../components/common/Label";
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
				<div className={`${css.location}`}>
					<Label text={contacts.city} classes={`${label.bold}`}/>
					<Label text={contacts.street} classes={`${label.mini}`}/>
				</div>

				<div className={`${css.schedule}`}>
					<Label text={contacts.schedule} classes={`${label.bold}`}/>
					<Label text={"Время работы"} classes={`${label.mini}`}/>
				</div>

				<div className={`${css.phone}`}>
					<Label text={contacts.phone} classes={`${label.bold}`}/>
					<Label text={"Контактный телефон"} classes={`${label.mini}`}/>
				</div>
			</div>
		</div>
	);
};

export default Info;