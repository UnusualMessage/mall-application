import React, {lazy} from "react";
import {Route, Routes} from "react-router-dom";

const Mall = lazy(() => import("./Mall"));
const Admin = lazy(() => import("./Admin"));

import "./App.scss";

const App = () => {
    return (
        <Routes>
            <Route path="/a/*" element={<Admin/>} />
            <Route path="/*" element={<Mall/>} />
        </Routes>
    );
};

export default App;
