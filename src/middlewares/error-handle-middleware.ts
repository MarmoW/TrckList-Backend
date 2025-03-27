import { Response } from "express";
import { ApplicationError } from "@/protocols";
import httpStatus from "http-status";

export function handleApplicationError(err: ApplicationError, res: Response ){

    if(err.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send({message: err.message});
    if(err.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send({message: err.message});
    if(err.name === "NoContentError") return res.status(httpStatus.NO_CONTENT).send({message: err.message});
    if(err.name === "Forbidden Error" ) return res.status(httpStatus.FORBIDDEN).send({message: err.message});
    if(err.name === "Conflict Error" ) return res.status(httpStatus.CONFLICT).send({message: err.message});
    if(err.name === "BadRequestError") return res.status(httpStatus.BAD_REQUEST).send({message: err.message});

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
};