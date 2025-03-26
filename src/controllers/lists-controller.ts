import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import listService from "@/services/list-service";

export async function getList(req: Request, res: Response, next: NextFunction){

    const {userId} = req.body;

    try{
        const lists = await listService.getUserLists(userId);

        return res.status(httpStatus.OK).send(lists)
    }catch(err){
        next(err);
    }
};

export async function updateList(req: Request, res: Response, next: NextFunction){

    const { listId, userId, data} = req.body;

    try{

        await listService.updateList(listId, userId, data);

        return res.sendStatus(httpStatus.OK)

    }catch(err){
        next(err);
    }
};

export async function deleteList(req: Request, res: Response, next: NextFunction){

    const {userId} = req.body;
    const {listId} = req.body;


    try{
        await listService.deleteList(listId, userId);

        return res.sendStatus(httpStatus.OK)
    }catch(err){
        next(err);
    }
};

export async function createList(req: Request, res: Response){
    const {userId} = req.body;


}