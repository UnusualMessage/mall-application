import {Map, Placemark, YMaps} from "react-yandex-maps";

import css from "./info.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../components/Label";

import contacts from "../../../data/contacts";
import Loader from "../../../components/Loader";
import {useState} from "react";

const Info = () => {
	const [loaded, setLoaded] = useState(false);
	
	const onMapLoad = () => {
		setLoaded(true);
	};
	
	const markerPosition = [54.35079996381128,38.261544220237724];
	
	return(
		<div className={`${css.wrapper}`}>
			<div style={{ width: "100%", height: "700px"}}>
				{ loaded ? <></> : <Loader/>}
				
				<YMaps>
					<Map style={{ width: "100%", height: "100%" }}
					     defaultState={{ center: markerPosition, zoom: 17 }}
					     onLoad={onMapLoad}>
						
						<Placemark defaultGeometry={markerPosition}/>
					</Map>
				</YMaps>
			</div>
			

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