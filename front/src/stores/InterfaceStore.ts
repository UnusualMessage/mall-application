import {makeAutoObservable} from "mobx";

class InterfaceStore {
	menuActive: boolean;
	
	constructor() {
		this.menuActive = false;
		
		makeAutoObservable(this);
	}
	
	isMenuActive = () => {
		return this.menuActive;
	};
	
	switchMenu = () => {
		this.menuActive = !this.menuActive;
	};
}

export default new InterfaceStore();