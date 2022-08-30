import { action, observable } from "mobx";
import { Response } from "../../api/interfaces/fetch";

export const requesterProps = {
    response: observable,

    invokeSuccess: action,
    invokeError: action,
};

class Requester {
    protected response: Response;

    constructor() {
        this.response = {
            message: "",
            successful: true,
        };
    }

    protected invokeSuccess = () => {
        this.response = {
            message: "",
            successful: true,
        };
    };

    protected invokeError = (error: string) => {
        this.response = {
            message: error,
            successful: false,
        };
    };

    public isRequestSuccessful = () => {
        return this.response.successful;
    };

    public getErrorMessage = () => {
        return this.response.message;
    };
}

export default Requester;
