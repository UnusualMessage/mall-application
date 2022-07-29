import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import Event from "./Event";
import {discounts, events, home, info, map, shops} from "../../data/breadcrumbs";

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
				
				<Route path={shops.route} element={<Shops />}/>
				<Route path={`${shops.route}/:shopId`} element={<Shop />}/>
				
				<Route path={discounts.route} element={<Discounts />}/>
				<Route path={`${discounts.route}/:discountId`} element={<Discount />}/>
				
				<Route path={events.route} element={<Events />}/>
				<Route path={`${events.route}/:eventId`} element={<Event />}/>
				
				<Route path={map.route} element={<Map />}/>
				<Route path={info.route} element={<Info />}/>
				
			</Route>
		</Routes>
	);
};

export default Mall;