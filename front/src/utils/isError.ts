import {Error} from "../api/interfaces/Error";

const isError = (data: any): data is Error => {
	return "error" in data;
};

export default isError;