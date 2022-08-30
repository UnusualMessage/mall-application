import {action, makeObservable, observable, runInAction, toJS} from "mobx";

import isError from "../utils/isError";
import CellService from "../api/services/CellService";
import Cell from "../api/interfaces/cell/Cell";
import {Requester} from "./base";
import {requesterProps} from "./base/Requester";

const props = {
	...requesterProps,
	cells: observable,
	getAsync: action
};

class CellStore extends Requester {
	private cells: Cell[];
	private cellService: CellService;
	
	constructor() {
		super();
		
		this.cells = [];
		this.cellService = new CellService();

		makeObservable(this, {
			...props
		});
	}
	
	public get() {
		return toJS(this.cells);
	}
	
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