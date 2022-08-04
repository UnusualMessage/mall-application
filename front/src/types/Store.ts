import Shop from "../api/interfaces/shop/Shop";
import Discount from "../api/interfaces/discount/Discount";
import Event from "../api/interfaces/event/Event";

export default interface Store {
	get(): Shop[] | Discount[] | Event[]
}
