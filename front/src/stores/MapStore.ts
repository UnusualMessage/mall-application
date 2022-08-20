import {makeAutoObservable} from "mobx";

import map from "../data/map";
import Cell from "../api/interfaces/cell/Cell";

class MapStore {
	private readonly map: Cell[];
	
	private scale: number;
	private readonly scaleInc: number;
	private readonly scaleLimit: { upper: number, lower: number };
	
	private floor: number;
	
	constructor() {
		this.map = map;
		
		this.scale = 1;
		this.scaleInc = 0.1;
		this.scaleLimit = {
			upper: 2,
			lower: 0.3
		};
		
		this.floor = 1;
		
		makeAutoObservable(this);
	}
	
	public get = () => {
		return this.map;
	};
	
	public getSchemaByFloor = () => {
		return this.map.filter(cell => cell.floor === this.floor);
	};
	
	public getScale = () => {
		return this.scale;
	};
	
	public getFloor = () => {
		return this.floor;
	};
	
	public zoomIn = () => {
		const newScale = this.scale + this.scaleInc;
		
		this.scale = (newScale <= this.scaleLimit.upper) ? newScale : this.scale;
	};
	
	public zoomOut = () => {
		const newScale = this.scale - this.scaleInc;
		
		this.scale = (newScale >= this.scaleLimit.lower) ? newScale : this.scale;
	};
	
	public toFloor = (floor: 1 | 2) => {
		this.floor = floor;
	};
}

export default new MapStore();