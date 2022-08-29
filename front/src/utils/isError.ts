import {Error} from "../api/interfaces/fetch";

const isError = (data: any): data is Error => {
	return data.error;
};

export default isError;