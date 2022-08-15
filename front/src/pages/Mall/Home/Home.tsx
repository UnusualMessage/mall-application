import {useEffect, useState} from "react";
import classNames from "classnames";
import {Skeleton} from "antd";

import styles from "/src/components/styles.module.scss";
import css from "./home.module.scss";

import PicturesCarousel from "../../../components/PicturesCarousel";

import ShopStore from "../../../stores/ShopStore";
import EventStore from "../../../stores/EventStore";
import DiscountStore from "../../../stores/DiscountStore";
import Shop from "../../../api/interfaces/shop/Shop";
import Discount from "../../../api/interfaces/discount/Discount";
import Event from "../../../api/interfaces/event/Event";

const Home = () => {
	const [shops, setShops] = useState<Shop[]>();
	const [discounts, setDiscounts] = useState<Discount[]>();
	const [events, setEvents] = useState<Event[]>();
	
	useEffect(() => {
		const get = async () => {
			const shops = await ShopStore.getAsync("Page=1&PageSize=10");
			const discounts = await DiscountStore.getAsync("Page=1&PageSize=10");
			const events = await EventStore.getAsync("Page=1&PageSize=6");
			
			setShops(shops);
			setDiscounts(discounts);
			setEvents(events);
		};
		
		void get();
	}, []);

    return(
        <div className={classNames(css.wrapper)}>
	        {
		        shops
			        ?
			        <PicturesCarousel images={shops}
			                          title={"Магазины"}
			                          linkLabel={"Все отделы"}
			                          to={"shops"}
			                          borderColor={styles.redBorder}
			                          rows={1}
			                          cols={4}
			        />
			        : <Skeleton active />
	        }
	
	        {
		        discounts
			        ?
			        <PicturesCarousel images={discounts}
			                          title={"Акции"}
			                          linkLabel={"Все акции"}
			                          to={"discounts"}
			                          borderColor={styles.greenBorder}
			                          rows={1}
			                          cols={3}
			        />
			        : <Skeleton active />
	        }
			
	        {
		        events
			        ?
			        <PicturesCarousel images={events}
			                          title={"Новости"}
			                          linkLabel={"Все новости"}
			                          to={"events"}
			                          borderColor={styles.blueBorder}
			                          rows={3}
			                          cols={2}
			        />
			        : <Skeleton active />
	        }
        </div>
        
    );
};

export default Home;