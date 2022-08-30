import Breadcrumb from "../interfaces/breadcrumb/Breadcrumb";
import { Error } from "../interfaces/fetch";
import { get } from "./requests";

class BreadcrumbService {
    protected readonly url: string;

    constructor() {
        this.url = "/api/breadcrumbs";
    }

    public get = async (query: string): Promise<Breadcrumb[] | Error> => {
        return await get(this.url, "", query);
    };
}

export default BreadcrumbService;
