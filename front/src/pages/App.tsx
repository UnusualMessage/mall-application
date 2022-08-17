import React, {lazy} from "react";
import {Route, Routes} from "react-router-dom";

import Loader from "../components/Loader";
const Mall = lazy(() => import("./Mall"));
const Admin = lazy(() => import("./Admin"));
const Authorization = lazy(() => import("./Admin/Authorization"));

import CategoryStore from "../stores/CategoryStore";
import ShopStore from "../stores/ShopStore";
import DiscountStore from "../stores/DiscountStore";
import EventStore from "../stores/EventStore";

import {RequireAuth} from "./Admin/Authorization";

import "./App.scss";
import "antd/dist/antd.css";
import {injectStores} from "@mobx-devtools/tools";

const App = () => {
	injectStores({
		CategoryStore,
		ShopStore,
		DiscountStore,
		EventStore
	});
	
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
