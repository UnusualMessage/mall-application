import { Error } from "../interfaces/fetch";
import Cell from "../interfaces/cell/Cell";
import { get } from "./requests";

class CellService {
    protected readonly url: string;

    constructor() {
        this.url = "/api/cells";
    }

    public get = async (query: string): Promise<Cell[] | Error> => {
        return await get(this.url, "", query);
    };
}

export default CellService;
