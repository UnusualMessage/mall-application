import {action, makeObservable} from "mobx";

import Store, {storeProps} from "./Store";
import Discount from "../api/interfaces/discount/Discount";
import CreateDiscount from "../api/interfaces/discount/CreateDiscount";
import UpdateDiscount from "../api/interfaces/discount/UpdateDiscount";
import DeleteDiscount from "../api/interfaces/discount/DeleteDiscount";
import DiscountService from "../api/services/DiscountService";
import events from "../data/events";

class EventStore extends Store<Discount, CreateDiscount, UpdateDiscount, DeleteDiscount> {
	constructor() {
		super(new DiscountService(), events);
		
		makeObservable(this, {
			...storeProps,
		});
	}
	
	public getEventsByShopId = (id: string) => {
		return this.data.filter(discount => discount.shop.id === id);
	};
}

export default new EventStore();