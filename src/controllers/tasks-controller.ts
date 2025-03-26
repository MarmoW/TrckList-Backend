import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import taskService from "@/services/task-service";

export async function getTasks(req: Request, res: Response, next: NextFunction){

    const {listId} = req.body;

    try{
        const notes = await taskService.getAllTaks(listId);
        return res.status(httpStatus.OK).send(notes);
    }catch(err){   
        next(err);

    }
};