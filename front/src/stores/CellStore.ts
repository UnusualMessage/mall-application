import {makeAutoObservable, runInAction, toJS} from "mobx";

import isError from "../utils/isError";
import RequestInfo from "../api/interfaces/RequestInfo";
import CellService from "../api/services/CellService";
import Cell from "../api/interfaces/cell/Cell";

class CellStore {
	private cells: Cell[];
	private cellService: CellService;
	
	private lastRequest: RequestInfo;
	
	constructor() {
		this.cells = [];
		this.cellService = new CellService();
		
		this.lastRequest = {
			message: "",
			successful: true
		};
		
		makeAutoObservable(this);
	}
	
	public get() {
		return toJS(this.cells);
	}
	
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
	
	public getAsync = async (query: string) => {
		const cells = await this.cellService.get(query);
		
		if (isError(cells)) {
			this.invokeError(cells.message);
			return;
		}
		
		this.invokeSuccess();
		runInAction(() => {
			this.cells = cells;
		});
	};
}

export default new CellStore();