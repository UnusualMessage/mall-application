import resolveResponse from "../../../utils/resolveResponse";

export const get = async (url: string, route: string, query: string) => {
	const options = {
		method: "GET",
	};
	
	const request = new Request(`${url}/${route}?${query}`, options);
	const response = await fetch(request);
	
	return resolveResponse(response);
};