import React, {lazy} from "react";
import {Route, Routes} from "react-router-dom";

import Loader from "../components/Loader";
const Mall = lazy(() => import("./Mall"));
const Admin = lazy(() => import("./Admin"));

import "./App.scss";

const App = () => {
    return (
        <React.Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="/admin/*" element={<Admin/>} />
                <Route path="/*" element={<Mall/>} />
            </Routes>
        </React.Suspense>
    );
};

export default App;
