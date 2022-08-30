import Shop from "../interfaces/shop/Shop";
import CreateShop from "../interfaces/shop/CreateShop";
import UpdateShop from "../interfaces/shop/UpdateShop";
import Service from "./Service";

class ShopService extends Service<Shop, CreateShop, UpdateShop> {
    constructor() {
        super("/api/shops");
    }
}

export default ShopService;
