import {Route, Routes} from "react-router-dom";
import React, {lazy, useEffect} from "react";
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

import ShopStore from "../../stores/ShopStore";
import EventStore from "../../stores/EventStore";
import DiscountStore from "../../stores/DiscountStore";

import ShopInterface from "../../api/interfaces/shop/Shop";
import DiscountInterface from "../../api/interfaces/discount/Discount";
import EventInterface from "../../api/interfaces/event/Event";
import shops from "../../data/shops";
import events from "../../data/events";
import discounts from "../../data/discounts";
import categories from "../../data/categories";
import NewImage from "./NewImage";

const Admin = () => {
	// const [shops, setShops] = useState<ShopInterface[]>([]);
	// const [discounts, setDiscounts] = useState<DiscountInterface[]>([]);
	// const [events, setEvents] = useState<EventInterface[]>([]);
	
	useEffect(() => {
		const getAll = async () => {
			// const shops = await ShopStore.getAsync("");
			// const discounts = await DiscountStore.getAsync("");
			// const events = await EventStore.getAsync("");
			
			// setShops(shops);
			// setDiscounts(discounts);
			// setEvents(events);
		};
		
		void getAll();
	}, []);
	
	return(
		<Routes>
			<Route path="*" element={<MainLayout />}>
				<Route path={"*"} element={<Empty description={"Пустая страница"}/>}/>
				
				<Route path={"shops"} element={<Items items={shops} />} />
				<Route path={"shops/:id"} element={<Shop/>} />
				<Route path={"shops/new"} element={<NewShop/>} />
				
				<Route path={"events"} element={<Items items={events} />} />
				<Route path={"events/:id"} element={<Event/>} />
				<Route path={"events/new"} element={<NewEvent/>} />
				
				<Route path={"discounts"} element={<Items items={discounts} />} />
				<Route path={"discounts/:id"} element={<Discount/>} />
				<Route path={"discounts/new"} element={<NewDiscount/>} />
				
				<Route path={"categories"} element={<Items items={categories}/>} />
				<Route path={"categories/:id"} element={<Category/>} />
				<Route path={"categories/new"} element={<NewCategory/>} />
				
				<Route path={"info"} element={<Info/>} />
				<Route path={"images"} element={<Items items={shops.map(item => { return { id: item.id, image: item.image }; })}/>} />
				<Route path={"images/new"} element={<NewImage/>} />
			</Route>
		</Routes>
	);
};

export default Admin;