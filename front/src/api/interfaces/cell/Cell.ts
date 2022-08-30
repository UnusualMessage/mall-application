import { Shop } from "../shop";

export default interface Cell {
    id: string;
    number: number;
    floor: number;
    shop?: Shop;
}
