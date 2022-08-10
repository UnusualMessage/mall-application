import Discount from "../interfaces/discount/Discount";
import CreateDiscount from "../interfaces/discount/CreateDiscount";
import UpdateDiscount from "../interfaces/discount/UpdateDiscount";
import DeleteDiscount from "../interfaces/discount/DeleteDiscount";
import Service from "./Service";

class DiscountService extends Service<Discount, CreateDiscount, UpdateDiscount, DeleteDiscount> {
	constructor() {
		super("https://localhost:44333/api/discounts/");
	}
}

export default DiscountService;