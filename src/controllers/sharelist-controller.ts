import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import listShareService from "@/services/list-share-service";


export async function shareList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const listId = Number(req.params.listId);
    const { userId } = req;
    const { isSingleUse } = req.body; 

    try{
        const shareCode = await listShareService.createShareCode(userId, listId, isSingleUse);
        return res.status(httpStatus.CREATED).send(shareCode);
    }catch(err){
        next(err);
    }
};

export async function joinSharedList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const { link } = req.body;

    try{
        await listShareService.joinWithCode(userId, link);
        return res.sendStatus(httpStatus.OK);
    }catch(err){
        next(err);
    }
};

export async function leaveSharedList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const {listId} = req.body;
    try{
        await listShareService.leaveListShare(userId, listId);
        return res.sendStatus(httpStatus.OK);
    }catch(err){
        next(err);
    }
};

export async function revokeUserAccess(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);
    const { revokedId } = req.body;
    
    try{
        await listShareService.revokeUserAccess(userId, listId, revokedId);
    }catch(err){
        next(err);
    }
};

export async function getAllShareCodes(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);

    try{
        const sharingCodes = await listShareService.seeAllShareCodes(userId, listId);
        return res.status(httpStatus.OK).send(sharingCodes);
    }catch(err){
        next(err);
    }
};

export async function getAllSharedUsers(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);

    try{
        const sharingUsers = await listShareService.getSharedUsers(userId, listId)
        return res.status(httpStatus.OK).send(sharingUsers);
    }catch(err){
        next(err);
    }
};

export async function deleteShareCode(req: AuthenticatedRequest, res: Response, next: NextFunction){
    //delete share code
};
