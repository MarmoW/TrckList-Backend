import { NextFunction, Response, Request } from "express";
import { ApplicationError } from "@/protocols";
import httpStatus from "http-status";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handleApplicationError(error: ApplicationError | Error | PrismaClientKnownRequestError,
     _req: Request, res: Response, _next: NextFunction ): void {

    if (error instanceof PrismaClientKnownRequestError) {
          handlePrismaError(error, res);
          return;
     };

    if(error.name === "NotFoundError") {
         res.status(httpStatus.NOT_FOUND).send({message: error.message});
         return;
    };
    if(error.name === "UnauthorizedError") {
         res.status(httpStatus.UNAUTHORIZED).send({message: error.message});
         return;
    };
    if(error.name === "NoContentError") { 
         res.status(httpStatus.NO_CONTENT).send({message: error.message});
         return;
    };
    if(error.name === "ForbiddenError" ) {
         res.status(httpStatus.FORBIDDEN).send({message: error.message});
         return;
    };
    if(error.name === "ConflictError" ) {
         res.status(httpStatus.CONFLICT).send({message: error.message}); 
         return;
    };
    if(error.name === "BadRequestError") {
         res.status(httpStatus.BAD_REQUEST).send({message: error.message});
         return;
    };
    
    if(error.message === "PrismaClientKnownRequestError"){
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
   }