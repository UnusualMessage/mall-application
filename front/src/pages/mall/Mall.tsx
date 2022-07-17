import {Route, Routes} from "react-router-dom";

import Base from "./Base";
import Home from "./Home";
import Shops from "./Shops";
import Discounts from "./Discounts";
import Events from "./Events";
import Map from "./Map";
import Info from "./Info";
import Shop from "./Shop";
import Discount from "./Discount";

const Mall = () => {
	return(
		<Routes>
			<Route path="*" element={<Base />}>
				<Route path="*" element={<Home />}/>
				
				<Route path="shops" element={<Shops />}/>
				<Route path="shops/:shopId" element={<Shop />}/>
				
				
				<Route path="discounts" element={<Discounts />}/>
				<Route path="discounts/:discountId" element={<Discount />}/>
				
				
				<Route path="events" element={<Events />}/>
				
				
				<Route path="map" element={<Map />}/>
				<Route path="info" element={<Info />}/>
				
			</Route>
		</Routes>
	);
};

export default Mall;