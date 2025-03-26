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
