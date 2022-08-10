import {makeAutoObservable} from "mobx";

class InterfaceStore {
	private menuActive: boolean;
	private filterActive: boolean;
	private mapFilterActive: boolean;
	private loading: boolean;
	
	constructor() {
		this.menuActive = false;
		this.filterActive = false;
		this.mapFilterActive = false;
		this.loading = false;
		
		makeAutoObservable(this);
	}
	
	public isLoading = () => {
		return this.loading;
	};
	
	public isMenuActive = () => {
		return this.menuActive;
	};
	
	public isFilterActive = () => {
		return this.filterActive;
	};
	
	public isMapFilterActive = () => {
		return this.mapFilterActive;
	};
	
	public setLoading = (loading: boolean) => {
		this.loading = loading;
	};
	
	public switchMenu = () => {
		this.menuActive = !this.menuActive;
	};
	
	public closeMenu = () => {
		this.menuActive = false;
	};
	
	public switchFilter = () => {
		this.filterActive = !this.filterActive;
	};
	
	public switchMapFilter = () => {
		this.mapFilterActive = !this.mapFilterActive;
	};
}

export default new InterfaceStore();