import { Route, Routes} from "react-router-dom";
import React, {lazy} from "react";

import Loader from "../../components/Loader";

const Base = lazy(() => import("./Base"));
const Home = lazy(() => import("./Home"));
const Shops = lazy(() => import("./Shops"));
const Shop = lazy(() => import("./Shop"));
const Discounts = lazy(() => import("./Discounts"));
const Discount = lazy(() => import("./Discount"));
const Events = lazy(() => import("./Events"));
const Event = lazy(() => import("./Event"));
const Map = lazy(() => import("./Map"));
const Info = lazy(() => import("./Info"));

import {discounts, events, info, map, shops} from "../../data/breadcrumbs";

const Mall = () => {
	return(
		<React.Suspense fallback={<Loader/>}>
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
		</React.Suspense>
	);
};

export default Mall;