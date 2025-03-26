import { ApplicationError } from "@/protocols";


export function noContentError(): ApplicationError {
    return{
        name: "NoContentError",
        message: "No valid data was provided for update"
    };
};