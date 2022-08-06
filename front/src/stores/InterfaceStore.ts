import {makeAutoObservable} from "mobx";

class InterfaceStore {
	menuActive: boolean;
	filterActive: boolean;
	mapFilterActive: boolean;
	loading: boolean;
	
	constructor() {
		this.menuActive = false;
		this.filterActive = false;
		this.mapFilterActive = false;
		this.loading = false;
		
		makeAutoObservable(this);
	}
	
	setLoading = (loading: boolean) => {
		this.loading = loading;
	};
	
	isLoading = () => {
		return this.loading;
	};
	
	isMenuActive = () => {
		return this.menuActive;
	};
	
	switchMenu = () => {
		this.menuActive = !this.menuActive;
	};
	
	closeMenu = () => {
		this.menuActive = false;
	};
	
	isFilterActive = () => {
		return this.filterActive;
	};
	
	switchFilter = () => {
		this.filterActive = !this.filterActive;
	};
	
	isMapFilterActive = () => {
		return this.mapFilterActive;
	};
	
	switchMapFilter = () => {
		this.mapFilterActive = !this.mapFilterActive;
	};
}

export default new InterfaceStore();