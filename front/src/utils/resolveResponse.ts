import {Error} from "../api/interfaces/Error";

const resolveResponse = async (response: Response): Promise<any | Error> => {
	if (response.ok) {
		return response.json();
	}
	
	return {
		message: await response.json(),
		error: true
	} as Error;
};

export default resolveResponse;