import {action, makeObservable, observable, runInAction} from "mobx";

import Filterable from "../types/Filterable";
import Store, {storeProps} from "./Store";
import UpdateShop from "../api/interfaces/shop/UpdateShop";
import DeleteShop from "../api/interfaces/shop/DeleteShop";
import CreateShop from "../api/interfaces/shop/CreateShop";
import Shop from "../api/interfaces/shop/Shop";
import ShopService from "../api/services/ShopService";

class ShopStore extends Store<Shop, CreateShop, UpdateShop, DeleteShop> implements Filterable {
	filter: string;
	
	constructor() {
		super(new ShopService(), []);
		
		this.filter = "Все";
		
		makeObservable(this, {
			...storeProps,
			filter: observable,
			
			setFilter: action,
			getAsync: action
		});
	}
	
	public getCountByCategoryId = (id: string) => {
		if (id === "1") {
			return this.data.length;
		}
		
		let count = 0;
		
		for (const shop of this.data) {
			if (shop.categories.find(shop => shop.id === id)) {
				++count;
			}
		}
		
		return count;
	};
	
	public getByCategory = (id: string) => {
		return this.data.filter(shop => {
			return shop.categories.find(category => category.id === id);
		});
	};
	
	public getFiltered = () => {
		if (this.filter === "Все") {
			return this.data;
		}
		
		return this.data.filter(shop => shop.categories.find(
			category => category.title === this.filter
		));
	};
	
	public getFilter = () => {
		return this.filter;
	};
	
	public setFilter = (filter: string) => {
		this.filter = filter;
	};
	
	public createAsync = async (newData: CreateShop) => {
		const service = this.service as ShopService;
		
		try {
			const data = await service.post(newData);
			
			runInAction(() => {
				this.data.push(data);
			});
			
		} catch(error) {
			this.invokeError("Request Error");
		}
	};
}

export default new ShopStore();