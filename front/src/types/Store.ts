import Shop from "../api/interfaces/shop/Shop";
import Discount from "../api/interfaces/discount/Discount";
import Event from "../api/interfaces/event/Event";

type Item = Shop[] | Discount[] | Event[];

export default interface Store {
	get(): Item
}
