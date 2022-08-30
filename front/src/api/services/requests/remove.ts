import resolveResponse from "../../../utils/resolveResponse";

export const remove = async (url: string, route: string, query: string, token = "") => {
	const headers = new Headers();
	headers.append("Authorization", `Bearer ${token}`);
	
	const options = {
		method: "DELETE",
		headers: headers
	};
	
	const request = new Request(`${url}/${route}?${query}`, options);
	const response = await fetch(request);
	
	return resolveResponse(response);
};