import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import listShareService from "@/services/list-share-service";


export async function shareList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const listId = Number(req.params.listId);
    const { userId } = req;
    const { singleUse } = req.body; 

    try{
        const shareCode = await listShareService.createShareCode(userId, listId, singleUse);
        res.status(httpStatus.CREATED).send(shareCode);
        return
    }catch(err){
        next(err);
    }
};

export async function joinSharedList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const { link } = req.body;

    try{
        await listShareService.joinWithCode(userId, link);
        res.sendStatus(httpStatus.OK);
        return 
    }catch(error){
        next(error);
    }
};

export async function leaveSharedList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const {listId} = req.body;
    try{
        await listShareService.leaveListShare(userId, listId);
        res.sendStatus(httpStatus.OK);
        return 
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
        res.sendStatus(httpStatus.OK);
        return
    }catch(err){
        next(err);
    }
};

export async function getAllShareCodes(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);

    try{
        const sharingCodes = await listShareService.seeAllShareCodes(userId, listId);
        res.status(httpStatus.OK).send(sharingCodes);
        return 
    }catch(err){
        next(err);
    }
};

export async function getAllSharedUsers(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);

    try{
        const sharingUsers = await listShareService.getSharedUsers(userId, listId)
        res.status(httpStatus.OK).send(sharingUsers);
        return 
    }catch(err){
        next(err);
    }
};

export async function deleteShareCode(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);
    const { link } = req.body;

    try{
        await listShareService.deleteShareCode(userId, listId, link);
        res.sendStatus(httpStatus.OK);
        return 
    }catch(err){
        next(err);
    }
};

export async function unshareList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId);
    console.log("unshare list", listId)

    try{
        await listShareService.deleteAllShares(userId, listId);
        res.sendStatus(httpStatus.OK);
        return
    }catch(err){
        next(err);
    }
};