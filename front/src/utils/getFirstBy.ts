import Discount from "../api/interfaces/discount/Discount";
import Event from "../api/interfaces/event/Event";
import Shop from "../api/interfaces/shop/Shop";

const getFirstBy = (count: number, array: (Discount | Event | Shop)[]) => {
	const end = (count > array.length) ? array.length : count;
	return array.slice(0, end);
};

export default getFirstBy;