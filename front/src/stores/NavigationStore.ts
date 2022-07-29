import {makeAutoObservable} from "mobx";

import Breadcrumb from "../types/Breadcrumb";
import { breadcrumbs } from "../data/breadcrumbs";
import {routes} from "../data/routes";

class NavigationStore {
	breadcrumbs: Breadcrumb[] = [];
	
	constructor() {
		this.toStart();
		
		makeAutoObservable(this);
	}
	
	toStart = () => {
		this.breadcrumbs = [{
			name: breadcrumbs[0].name,
			route: breadcrumbs[0].route
		}];
	};
	
	toNext = (path: string) => {
		this.toStart();
		
		if (!routes.find(route => path === route.path)) {
			return;
		}
		
		const currentRoutes: string[] = path.split("/").filter(route => route !== "");
		
		for (const currentRoute of currentRoutes) {
			const route = breadcrumbs.find(breadcrumb => currentRoute === breadcrumb.route);
			
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