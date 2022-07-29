import {makeAutoObservable} from "mobx";

class InterfaceStore {
	menuActive: boolean;
	filterActive: boolean;
	
	constructor() {
		this.menuActive = false;
		this.filterActive = false;
		
		makeAutoObservable(this);
	}
	
	isMenuActive = () => {
		return this.menuActive;
	};
	
	switchMenu = () => {
		this.menuActive = !this.menuActive;
	};
	
	isFilterActive = () => {
		return this.filterActive;
	};
	
	switchFilter = () => {
		this.filterActive = !this.filterActive;
	};
}

export default new InterfaceStore();