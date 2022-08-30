import Discount from "../interfaces/discount/Discount";
import CreateDiscount from "../interfaces/discount/CreateDiscount";
import UpdateDiscount from "../interfaces/discount/UpdateDiscount";
import Service from "./Service";

class DiscountService extends Service<Discount, CreateDiscount, UpdateDiscount> {
	constructor() {
		super("/api/discounts");
	}
}

export default DiscountService;