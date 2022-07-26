import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import Event from "./Event";

const Base = lazy(() => import("./Base"));
const Home = lazy(() => import("./Home"));
const Shops = lazy(() => import("./Shops"));
const Discounts = lazy(() => import("./Discounts"));
const Events = lazy(() => import("./Events"));
const Map = lazy(() => import("./Map"));
const Info = lazy(() => import("./Info"));
const Shop = lazy(() => import("./Shop"));
const Discount = lazy(() => import("./Discount"));

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
				<Route path="events/:eventId" element={<Event />}/>
				
				<Route path="map" element={<Map />}/>
				<Route path="info" element={<Info />}/>
				
			</Route>
		</Routes>
	);
};

export default Mall;