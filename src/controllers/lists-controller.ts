import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import listService from "@/services/list-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getList(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const { userId } = req;

    try{
        const lists = await listService.getUserLists(userId);

        res.status(httpStatus.OK).send(lists)
        return 
    }catch(err){
        next(err);
    }
};

export async function updateList(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req;
    const listId = Number(req.params.listId); 
    const { data} = req.body;

    try{
        await listService.updateList(listId, userId, data);
        res.sendStatus(httpStatus.OK)
        return
    }catch(err){
        next(err);
    }
};

export async function deleteList(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const {userId} = req;
    const listId = Number(req.params.listId); 

    try{
        await listService.deleteList(listId, userId);

        res.sendStatus(httpStatus.OK)
        return
    }catch(err){
        next(err);
    }
};

export async function createList(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const { userId } = req;
    const { listType, name } = req.body;

    try{
        const list = await listService.createList(userId, listType, name);
        
        res.status(httpStatus.OK).send(list.id);
        return
    }catch(err){
        next(err);
    }
};
