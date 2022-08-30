import { message as Message } from "antd";

export const showMessage = async (
    successful: boolean,
    message: string,
    error: string
) => {
    if (successful) {
        Message.success(message);
    } else {
        Message.error(error);
    }
};
