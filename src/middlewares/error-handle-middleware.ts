import { NextFunction, Response, Request } from "express";
import { ApplicationError } from "@/protocols";
import httpStatus from "http-status";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handleApplicationError(err: ApplicationError | Error | PrismaClientKnownRequestError,
     _req: Request, res: Response, _next: NextFunction ): void {
    
     console.log(err.name)
    if (err instanceof PrismaClientKnownRequestError) {
          handlePrismaError(err, res);
          return;
     };

    if(err.name === "NotFoundError") {
         res.status(httpStatus.NOT_FOUND).send({message: err.message});
         return;
    };
    if(err.name === "UnauthorizedError") {
         res.status(httpStatus.UNAUTHORIZED).send({message: err.message});
         return;
    };
    if(err.name === "NoContentError") { 
         res.status(httpStatus.NO_CONTENT).send({message: err.message});
         return;
    };
    if(err.name === "ForbiddenError" ) {
         res.status(httpStatus.FORBIDDEN).send({message: err.message});
         return;
    };
    if(err.name === "ConflictError" ) {
         res.status(httpStatus.CONFLICT).send({message: err.message}); 
         return;
    };
    if(err.name === "BadRequestError") {
         res.status(httpStatus.BAD_REQUEST).send({message: err.message});
         return;
    };
    
    if(err.message === "PrismaClientKnownRequestError"){
         res.status(httpStatus.CONFLICT).send({message:"Escolha outro nome."});
         return;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
};

function handlePrismaError(error: PrismaClientKnownRequestError, res: Response) {

     switch (error.code) {
       case 'P2002':
         res.status(httpStatus.CONFLICT).json({
           error: 'ConflictError',
           message: 'Unique constraint violation',
           details: 'Escolha outro nome.',
         });
         break;
   
       case 'P2025': // Record not found
         res.status(httpStatus.NOT_FOUND).json({
           error: 'NotFoundError',
           message: 'Record not found',
         });
         break;
   
       default:
         console.error('Unhandled Prisma error:', error);
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
           error: 'DatabaseError',
           message: 'An unexpected database error occurred',
         });
     }
   };