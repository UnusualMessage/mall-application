import {makeAutoObservable, runInAction} from "mobx";

import Breadcrumb from "../api/interfaces/breadcrumb/Breadcrumb";
import BreadcrumbService from "../api/services/BreadcrumbService";
import RouteService from "../api/services/RouteService";
import Route from "../api/interfaces/route/Route";

class NavigationStore {
	private breadcrumbs: Breadcrumb[] = [];
	
	private totalBreadcrumbs: Breadcrumb[] = [];
	private totalRoutes: Route[] = [];
	
	private breadcrumbService: BreadcrumbService;
	private routeService: RouteService;
	
	constructor() {
		this.toStart();
		this.breadcrumbService = new BreadcrumbService();
		this.routeService = new RouteService();
		
		makeAutoObservable(this);
	}
	
	public get = () => {
		return this.breadcrumbs;
	};
	
	public toStart = () => {
		this.breadcrumbs = [{
			name: "Главная",
			link: "/"
		}];
	};
	
	public toNext = (path: string) => {
		this.toStart();
		
		if (!this.totalRoutes.find(route => path === route.path)) {
			return;
		}
		
		const currentRoutes: string[] = path.split("/").filter(route => route !== "");
		
		for (const currentRoute of currentRoutes) {
			const route = this.totalBreadcrumbs.find(breadcrumb => currentRoute === breadcrumb.link);
			
			if (route) {
				this.breadcrumbs.push({
					name: route.name,
					link: currentRoute
				});
			} else {
				this.toStart();
			}
		}
	};
	
	public getAsync = async (query: string) => {
		const breadcrumbs = await this.breadcrumbService.get(query);
		const routes = await this.routeService.get(query);
		
		runInAction(() => {
			this.totalBreadcrumbs = breadcrumbs;
			this.totalRoutes = routes;
		});
	};
}

export default new NavigationStore();