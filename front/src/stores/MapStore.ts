import { makeAutoObservable } from "mobx";

import map from "../data/map";
import Cell from "../api/interfaces/cell/Cell";

interface Path {
    path: JSX.Element;
}

class MapStore {
    private readonly map: Omit<Cell & Path, "shop" | "id">[];
    private clicked: Cell | undefined;

    private scale: number;
    private readonly scaleInc: number;
    private readonly scaleLimit: { upper: number; lower: number };

    private floor: number;

    constructor() {
        this.map = map;
        this.clicked = undefined;

        this.scale = 1;
        this.scaleInc = 0.1;
        this.scaleLimit = {
            upper: 2,
            lower: 0.3,
        };

        this.floor = 1;

        makeAutoObservable(this);
    }

    public get = () => {
        return this.map;
    };

    public getClicked = () => {
        return this.clicked;
    };

    public getScale = () => {
        return this.scale;
    };

    public getFloor = () => {
        return this.floor;
    };

    public click = (cell: Cell) => {
        this.clicked = {
            ...cell,
        };
    };

    public zoomIn = () => {
        const newScale = this.scale + this.scaleInc;

        this.scale = newScale <= this.scaleLimit.upper ? newScale : this.scale;
    };

    public zoomOut = () => {
        const newScale = this.scale - this.scaleInc;

        this.scale = newScale >= this.scaleLimit.lower ? newScale : this.scale;
    };

    public toFloor = (floor: 1 | 2) => {
        this.floor = floor;
    };
}

export default new MapStore();
