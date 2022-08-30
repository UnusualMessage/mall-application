import Route from "../interfaces/route/Route";
import { Error } from "../interfaces/fetch";
import { get } from "./requests";

class RouteService {
    protected readonly url: string;

    constructor() {
        this.url = "/api/routes";
    }

    public get = async (query: string): Promise<Route[] | Error> => {
        return await get(this.url, "", query);
    };
}

export default RouteService;
