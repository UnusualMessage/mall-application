import {makeAutoObservable} from "mobx";

import Breadcrumb from "../types/Breadcrumb";
import { routes } from "../data/routes";

class NavigationStore {
	breadcrumbs: Breadcrumb[] = [];
	
	constructor() {
		this.toStart();
		
		makeAutoObservable(this);
	}
	
	toStart = () => {
		this.breadcrumbs = [{
			name: routes[0].name,
			route: routes[0].route
		}];
	};
	
	toNext = (path: string) => {
		this.toStart();
		
		const currentRoutes: string[] = path.split("/").filter(route => route !== "");
		
		for (const currentRoute of currentRoutes) {
			const route = routes.find(route => currentRoute === route.route);
			
			if (route) {
				this.get().push({
					name: route.name,
					route: currentRoute
				});
			} else {
				this.toStart();
			}
		}
	};

	get = () => {
		return this.breadcrumbs;
	};
}

export default new NavigationStore();