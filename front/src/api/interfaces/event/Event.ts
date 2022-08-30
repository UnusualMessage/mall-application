import Shop from "../shop/Shop";
import Image from "../image/Image";

export default interface Event {
    id: string;
    title: string;
    link: string;
    routePath: string;
    description: string;

    image: Image;
    shop: Shop;
}
