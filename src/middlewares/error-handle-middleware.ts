import { NextFunction, Response } from "express";
import { ApplicationError } from "@/protocols";
import httpStatus from "http-status";

export function handleApplicationError(err: ApplicationError | Error ,_req: Request, res: Response, _next: NextFunction ){

    if(err.name === "NotFoundError") {
        res.status(httpStatus.NOT_FOUND).send({message: err.message});
        return
    };
    if(err.name === "UnauthorizedError") {
        res.status(httpStatus.UNAUTHORIZED).send({message: err.message});
        return
    };
    if(err.name === "NoContentError") { 
        res.status(httpStatus.NO_CONTENT).send({message: err.message});
        return
    };
    if(err.name === "ForbiddenError" ) {
        res.status(httpStatus.FORBIDDEN).send({message: err.message});
        return
    };
    if(err.name === "ConflictError" ) {
        res.status(httpStatus.CONFLICT).send({message: err.message}); 
        return
    };
    if(err.name === "BadRequestError") {
        res.status(httpStatus.BAD_REQUEST).send({message: err.message});
        return
    };

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
};