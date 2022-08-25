import resolveResponse from "../../../utils/resolveResponse";

export const post = async (model: unknown, url: string, route: string, query: string) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify(model)
	};
	
	const request = new Request(`${url}/${route}?${query}`, options);
	const response = await fetch(request);
	
	return resolveResponse(response);
};