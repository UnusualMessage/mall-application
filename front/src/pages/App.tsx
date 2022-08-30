import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "../components/Loader";
import { RequireAuth } from "./Admin/Authorization";

const Mall = lazy(() => import("./Mall"));
const Admin = lazy(() => import("./Admin"));
const Authorization = lazy(() => import("./Admin/Authorization"));

import "./App.scss";
import "antd/dist/antd.css";

const App = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <Routes>
                <Route
                    path="/admin/*"
                    element={
                        <RequireAuth>
                            {" "}
                            <Admin />{" "}
                        </RequireAuth>
                    }
                />
                <Route path="/*" element={<Mall />} />
                <Route
                    path={"/key/authorization"}
                    element={<Authorization />}
                />
            </Routes>
        </React.Suspense>
    );
};

export default App;
