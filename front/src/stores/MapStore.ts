import {makeAutoObservable} from "mobx";

import map from "../data/map";
import Cell from "../api/interfaces/cell/Cell";

class MapStore {
	map: Cell[];
	
	scale: number;
	scaleInc: number;
	scaleLimit: { upper: number, lower: number };
	
	floor: number;
	
	tooltipState: TooltipState;
	
	constructor() {
		this.map = map;
		
		this.scale = 1;
		this.scaleInc = 0.1;
		this.scaleLimit = {
			upper: 2,
			lower: 0.3
		};
		
		this.tooltipState = {
			left: 0,
			top: 0,
			visible: false
		};
		
		this.floor = 1;
		
		makeAutoObservable(this);
	}
	
	get = () => {
		return this.map;
	};
	
	getSchemaByFloor = (floor: number) => {
		return this.map.filter(cell => cell.floor === floor);
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
	
	setTooltip = (state: TooltipState) => {
		this.tooltipState = state;
	};
	
	getTooltip = () => {
		return this.tooltipState;
	};
	
	toFloor = (floor: number) => {
		if (floor == 1 || floor == 2) {
			this.floor = floor;
		}
	};
	
	getFloor = () => {
		return this.floor;
	};
}

interface TooltipState {
	left: number,
	top: number,
	visible: boolean
}

export default new MapStore();