import React, {lazy} from "react";
import {Route, Routes} from "react-router-dom";

import Loader from "../components/Loader";
const Mall = lazy(() => import("./Mall"));
const Admin = lazy(() => import("./Admin"));
import Authorization from "./Admin/Authorization/Authorization";
import RequireAuth from "./Admin/Authorization/RequireAuth";

import "./App.scss";

// import {enableLogging} from "mobx-logger";
// import {injectStores} from "@mobx-devtools/tools";
// import InterfaceStore from "../stores/InterfaceStore";
// import EventStore from "../stores/EventStore";
// import NavigationStore from "../stores/NavigationStore";
// import DiscountStore from "../stores/DiscountStore";
// import ShopStore from "../stores/ShopStore";
// import CategoryStore from "../stores/CategoryStore";


const App = () => {
	// enableLogging();
	//
	// injectStores({
	// 	ShopStore,
	// 	CategoryStore,
	// 	NavigationStore,
	// 	DiscountStore,
	// 	InterfaceStore,
	// 	EventStore
	// });
	
	
	return (
        <React.Suspense fallback={<Loader/>}>
            <Routes>
	            <Route path="/admin/*" element={<RequireAuth> <Admin/> </RequireAuth>} />
                <Route path="/*" element={<Mall/>} />
	            <Route path={"/key/authorization"} element={<Authorization/>} />
            </Routes>
        </React.Suspense>
    );
};

export default App;
