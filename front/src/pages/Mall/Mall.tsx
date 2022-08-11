import {Route, Routes} from "react-router-dom";
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

const Mall = () => {
	return(
		<React.Suspense fallback={<Loader/>}>
			<Routes>
				<Route path="*" element={<Base />}>
					<Route path="*" element={<Home />}/>
					
					<Route path="shops" element={<Shops />}/>
					<Route path={"shops/:title/:id"} element={<Shop />}/>
					
					<Route path={"discounts"} element={<Discounts />}/>
					<Route path={"discounts/:title/:id"} element={<Discount />}/>
					
					<Route path={"events"} element={<Events />}/>
					<Route path={"events/:title/:id"} element={<Event />}/>
					
					<Route path={"map"} element={<Map />}/>
					<Route path={"info"} element={<Info />}/>
				
				</Route>
			</Routes>
		</React.Suspense>
	);
};

export default Mall;