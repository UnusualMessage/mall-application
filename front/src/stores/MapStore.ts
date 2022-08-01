import {makeAutoObservable} from "mobx";

import map from "../data/map";
import Cell from "../api/interfaces/cell/Cell";

class MapStore {
	map: Cell[];
	
	scale: number;
	scaleInc: number;
	scaleLimit: { upper: number, lower: number };
	
	constructor() {
		this.map = map;
		
		this.scale = 1;
		this.scaleInc = 0.1;
		this.scaleLimit = {
			upper: 2,
			lower: 0.3
		};
		
		makeAutoObservable(this);
	}
	
	get = () => {
		return this.map;
	};
	
	zoomIn = () => {
		const newScale = this.scale + this.scaleInc;
		
		this.scale = (newScale <= this.scaleLimit.upper) ? newScale : this.scale;
	};
	
	zoomOut = () => {
		const newScale = this.scale - this.scaleInc;
		
		this.scale = (newScale >= this.scaleLimit.lower) ? newScale : this.scale;
	};
	
	getScale = () => {
		return this.scale;
	};
}

export default new MapStore();