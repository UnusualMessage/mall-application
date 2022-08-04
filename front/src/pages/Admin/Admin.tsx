import {Route, Routes} from "react-router-dom";
import {lazy} from "react";

const Base = lazy(() => import("./Base"));
const Shops = lazy(() => import("./Shops"));
const Shop = lazy(() => import("./Shop"));
const Events = lazy(() => import("./Events"));
const Event = lazy(() => import("./Event"));
const Discounts = lazy(() => import("./Discounts"));
const Discount = lazy(() => import("./Discount"));

const Admin = () => {
    return(
        <Routes>
            <Route path="*" element={<Base />}>
                <Route path="*" element={<></>} />
                
                <Route path="shops" element={<Shops/>} />
                <Route path="shops:id" element={<Shop/>} />
                
                <Route path="events" element={<Events/>} />
                <Route path="events:id" element={<Event/>} />
                
                <Route path="discounts" element={<Discounts/>} />
                <Route path="discounts:id" element={<Discount/>} />
            </Route>
        </Routes>
    );
};

export default Admin;