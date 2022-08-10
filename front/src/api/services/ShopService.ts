import Shop from "../interfaces/shop/Shop";
import CreateShop from "../interfaces/shop/CreateShop";
import UpdateShop from "../interfaces/shop/UpdateShop";
import DeleteShop from "../interfaces/shop/DeleteShop";
import Service from "./Service";

class ShopService extends Service<Shop, CreateShop, UpdateShop, DeleteShop>{
	constructor() {
		super("https://localhost:44333/api/shops/");
	}
}

export default ShopService;