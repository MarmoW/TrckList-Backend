import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { prisma } from '@/config';
import { unauthorizedError } from '@/errors';

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
   
    const authHeader = req.header('Authorization');
    
    if(!authHeader) return sendUnauthRes(res);
    
    const token = authHeader.split(' ')[1];
    if(!token) return sendUnauthRes(res);

    try{
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        const session = await prisma.session.findFirst({
            where:{
                token,
            },
        });

        if(!session) return sendUnauthRes(res);

        req.userId = userId;

        return next();
    }catch(err){
        return sendUnauthRes(res);
    }
};

function sendUnauthRes(res: Response) {
    res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
};