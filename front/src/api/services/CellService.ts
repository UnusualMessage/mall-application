import resolveResponse from "../../utils/resolveResponse";
import {Error} from "../interfaces/Error";
import Cell from "../interfaces/cell/Cell";

class CellService {
	protected readonly webApiUrl: string;
	
	constructor() {
		this.webApiUrl = "/api/cells/";
	}
	
	public get = async (urlParams: string): Promise<Cell[] | Error> => {
		const options = {
			method: "GET",
		};
		
		const request = new Request(this.webApiUrl + "?" + urlParams, options);
		const response = await fetch(request);
		
		return resolveResponse(response);
	};
}

export default CellService;