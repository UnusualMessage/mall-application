import {Route, Routes} from "react-router-dom";
import React, {lazy} from "react";
import {Empty} from "antd";

const Items = lazy(() => import("./Items"));
const Shop = lazy(() => import("./Shop"));
const Event = lazy(() => import("./Event"));
const Discount = lazy(() => import("./Discount"));
const Info = lazy(() => import("./Info"));
const NewEvent = lazy(() => import("./NewEvent"));
const NewDiscount = lazy(() => import("./NewDiscount"));
const NewShop = lazy(() => import("./NewShop"));
const Category = lazy(() => import("./Category"));
const NewCategory = lazy(() => import("./NewCategory"));

import MainLayout from "./MainLayout";
import NewImage from "./NewImage";

import {StoreType} from "./Items";

const Admin = () => {
	return(
		<Routes>
			<Route path="*" element={<MainLayout />}>
				<Route path={"*"} element={<Empty description={"Пустая страница"}/>}/>
				
				<Route path={"shops"} element={<Items storeType={StoreType.shop} />} />
				<Route path={"shops/:id"} element={<Shop/>} />
				<Route path={"shops/new"} element={<NewShop/>} />
				
				<Route path={"events"} element={<Items storeType={StoreType.event} />} />
				<Route path={"events/:id"} element={<Event/>} />
				<Route path={"events/new"} element={<NewEvent/>} />
				
				<Route path={"discounts"} element={<Items storeType={StoreType.discount} />} />
				<Route path={"discounts/:id"} element={<Discount/>} />
				<Route path={"discounts/new"} element={<NewDiscount/>} />
				
				<Route path={"categories"} element={<Items storeType={StoreType.category} />} />
				<Route path={"categories/:id"} element={<Category/>} />
				<Route path={"categories/new"} element={<NewCategory/>} />
				
				<Route path={"info"} element={<Info/>} />
				<Route path={"images"} element={<Items storeType={StoreType.image}/>} />
				<Route path={"images/new"} element={<NewImage/>} />
			</Route>
		</Routes>
	);
};

export default Admin;