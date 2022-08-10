import {Map, Placemark, YMaps} from "react-yandex-maps";
import {useState} from "react";
import classNames from "classnames";

import css from "./info.module.scss";

import Loader from "../../../components/Loader";
import Contacts from "../../../components/Contacts";

const Info = () => {
	const [loaded, setLoaded] = useState(false);
	
	const onMapLoad = () => {
		setLoaded(true);
	};
	
	const markerPosition = [54.35079996381128,38.261544220237724];
	
	return(
		<div className={classNames(css.wrapper)}>
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
			

			<div className={classNames(css.about)}>
				<Contacts/>
			</div>
		</div>
	);
};

export default Info;