import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";
import { invalidDataError } from "@/errors/invalid-data-error";
import { ObjectSchema } from "joi";


type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export function validate(schema: ObjectSchema, type: "body" | "params"){
    return(req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req[type], {
            abortEarly: false,
        });
    
    if(!error){
        next();
    }else{
        res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message )))
    }
  };
};

export function validateBody<T>(schema: ObjectSchema<T>){
    return validate(schema, "body");
};

export function validateParams<T>(schema: ObjectSchema<T>){
    return validate(schema, "params");
};