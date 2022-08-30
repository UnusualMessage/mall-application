import { action, makeObservable, observable, runInAction } from "mobx";

import Breadcrumb from "../api/interfaces/breadcrumb/Breadcrumb";
import BreadcrumbService from "../api/services/BreadcrumbService";
import RouteService from "../api/services/RouteService";
import Route from "../api/interfaces/route/Route";
import isError from "../utils/isError";
import { requesterProps } from "./base/Requester";
import { Requester } from "./base";

const props = {
    ...requesterProps,

    breadcrumbs: observable,
    totalBreadcrumbs: observable,
    totalRoutes: observable,
    toStart: action,
    toNext: action,
    getBreadcrumbsAsync: action,
    getRoutesAsync: action,
    getAsync: action,
};

class NavigationStore extends Requester {
    private breadcrumbs: Breadcrumb[] = [];

    private totalBreadcrumbs: Breadcrumb[] = [];
    private totalRoutes: Route[] = [];

    private breadcrumbService: BreadcrumbService;
    private routeService: RouteService;

    constructor() {
        super();

        this.toStart();
        this.breadcrumbService = new BreadcrumbService();
        this.routeService = new RouteService();

        makeObservable(this, {
            ...props,
        });
    }

    public get = () => {
        return this.breadcrumbs;
    };

    public toStart = () => {
        this.breadcrumbs = [
            {
                name: "Главная",
                link: "/",
            },
        ];
    };

    public toNext = (path: string) => {
        this.toStart();

        if (!this.totalRoutes.find((route) => path === route.path)) {
            return;
        }

        const currentRoutes: string[] = path
            .split("/")
            .filter((route) => route !== "");

        for (const currentRoute of currentRoutes) {
            const route = this.totalBreadcrumbs.find(
                (breadcrumb) => currentRoute === breadcrumb.link
            );

            if (route) {
                this.breadcrumbs.push({
                    name: route.name,
                    link: currentRoute,
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
