import {Route, Routes} from "react-router-dom";
import React, {lazy} from "react";

const Items = lazy(() => import("./Items"));
const Base = lazy(() => import("./Base"));
const Shop = lazy(() => import("./Shop"));
const Event = lazy(() => import("./Event"));
const Discount = lazy(() => import("./Discount"));
const Info = lazy(() => import("./Info"));
const NewEvent = lazy(() => import("./NewEvent"));
const NewDiscount = lazy(() => import("./NewDiscount"));
const NewShop = lazy(() => import("./NewShop"));
const Categories = lazy(() => import("./Categories"));
const Category = lazy(() => import("./Category"));
const NewCategory = lazy(() => import("./NewCategory"));

import Loader from "../../components/Loader";

import {discounts, events, info, shops} from "../../data/breadcrumbs";
import ShopStore from "../../stores/ShopStore";
import EventStore from "../../stores/EventStore";
import DiscountStore from "../../stores/DiscountStore";

const Admin = () => {
    return(
        <React.Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="*" element={<Base />}>
                    <Route path={shops.route} element={<Items items={ShopStore.get()} />} />
                    <Route path={`${shops.route}/:id`} element={<Shop/>} />
                    <Route path={`${shops.route}/new`} element={<NewShop/>} />
                    
                    <Route path={events.route} element={<Items items={EventStore.get()} />} />
                    <Route path={`${events.route}/:id`} element={<Event/>} />
                    <Route path={`${events.route}/new`} element={<NewEvent/>} />
                    
                    <Route path={discounts.route} element={<Items items={DiscountStore.get()} />} />
                    <Route path={`${discounts.route}/:id`} element={<Discount/>} />
                    <Route path={`${discounts.route}/new`} element={<NewDiscount/>} />
                    
                    <Route path={"categories"} element={<Categories/>} />
                    <Route path={"categories/:id"} element={<Category/>} />
                    <Route path={"categories/new"} element={<NewCategory/>} />
                    
                    <Route path={info.route} element={<Info/>} />
                </Route>
            </Routes>
        </React.Suspense>
    );
};

export default Admin;