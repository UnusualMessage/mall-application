import resolveResponse from "../../../utils/resolveResponse";

export const post = async (
    model: unknown,
    url: string,
    route: string,
    query: string,
    token = ""
) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(model),
    };

    const request = new Request(`${url}/${route}?${query}`, options);
    const response = await fetch(request);

    return resolveResponse(response);
};
