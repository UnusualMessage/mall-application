import Shop from "../shop/Shop";
import Image from "../image/Image";

export default interface Discount {
    id: string;
    title: string;
    link: string;
    routePath: string;
    description: string;

    image: Image;
    shop: Shop;
}
