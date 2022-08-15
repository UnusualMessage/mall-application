import React, {lazy} from "react";
import {Route, Routes} from "react-router-dom";

import Loader from "../components/Loader";
const Mall = lazy(() => import("./Mall"));
const Admin = lazy(() => import("./Admin"));
const Authorization = lazy(() => import("./Admin/Authorization/Authorization"));
const RequireAuth = lazy(() => import("./Admin/Authorization/RequireAuth"));

import "./App.scss";
import "antd/dist/antd.css";

const App = () => {
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
