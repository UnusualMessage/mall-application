import {Route, Routes} from "react-router-dom";
import {lazy} from "react";

const Items = lazy(() => import("./Items"));
const Base = lazy(() => import("./Base"));
const Shop = lazy(() => import("./Shop"));
const Event = lazy(() => import("./Event"));
const Discount = lazy(() => import("./Discount"));

import {discounts, events, shops} from "../../data/breadcrumbs";
import ShopStore from "../../stores/ShopStore";
import EventStore from "../../stores/EventStore";
import DiscountStore from "../../stores/DiscountStore";

const Admin = () => {
    return(
        <Routes>
            <Route path="*" element={<Base />}>
                <Route path="*" element={<></>} />
                
                <Route path={shops.route} element={<Items store={ShopStore}/>} />
                <Route path={`${shops.route}:id`} element={<Shop/>} />
                
                <Route path={events.route} element={<Items store={EventStore}/>} />
                <Route path={`${events.route}:id`} element={<Event/>} />
                
                <Route path={discounts.route} element={<Items store={DiscountStore}/>} />
                <Route path={`${discounts.route}:id`} element={<Discount/>} />
            </Route>
        </Routes>
    );
};

export default Admin;