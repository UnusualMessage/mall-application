import {makeAutoObservable, runInAction} from "mobx";

import Breadcrumb from "../api/interfaces/breadcrumb/Breadcrumb";
import BreadcrumbService from "../api/services/BreadcrumbService";
import RouteService from "../api/services/RouteService";
import Route from "../api/interfaces/route/Route";
import RequestInfo from "../api/interfaces/RequestInfo";
import isError from "../utils/isError";

class NavigationStore {
	private breadcrumbs: Breadcrumb[] = [];
	
	private totalBreadcrumbs: Breadcrumb[] = [];
	private totalRoutes: Route[] = [];
	
	private breadcrumbService: BreadcrumbService;
	private routeService: RouteService;
	
	private lastRequest: RequestInfo;
	
	constructor() {
		this.toStart();
		this.breadcrumbService = new BreadcrumbService();
		this.routeService = new RouteService();
		
		this.lastRequest = {
			message: "",
			successful: true
		};
		
		makeAutoObservable(this);
	}
	
	public get = () => {
		return this.breadcrumbs;
	};
	
	protected invokeSuccess = () => {
		this.lastRequest = {
			message: "",
			successful: true
		};
	};
	
	private invokeError = (error: string) => {
		this.lastRequest = {
			message: error,
			successful: false
		};
	};
	
	public isRequestSuccessful = () => {
		return this.lastRequest.successful;
	};
	
	public getErrorMessage = () => {
		return this.lastRequest.message;
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
			}
		}
	};
	
	public getBreadcrumbsAsync = async (query: string) => {
		const data = await this.breadcrumbService.get(query);
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.totalBreadcrumbs = data;
		});
	};
	
	public getRoutesAsync = async (query: string) => {
		const data = await this.routeService.get(query);
		
		if (isError(data)) {
			this.invokeError(data.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.totalRoutes = data;
		});
	};
	
	public getAsync = async () => {
		await this.getRoutesAsync("");
		await this.getBreadcrumbsAsync("");
	};
}

export default new NavigationStore();