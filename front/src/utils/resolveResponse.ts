import { Error } from "../api/interfaces/fetch";

const resolveResponse = async (response: Response): Promise<any | Error> => {
    if (response.ok) {
        return response.json();
    }

    return response.json();
};

export default resolveResponse;
