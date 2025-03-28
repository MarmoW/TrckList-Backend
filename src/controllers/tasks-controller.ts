import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import taskService from "@/services/task-service";
import { AuthenticatedRequest } from "@/middlewares";


export async function getTasks(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const listId = Number(req.params.listId);

    try{
        const notes = await taskService.getAllTaks(listId);
        res.status(httpStatus.OK).send(notes);
        return
    }catch(err){   
        next(err);

    }
};

export async function updateTask(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {userId } = req;
    const listId = Number(req.params.listId); 
    const taskId = Number(req.params.taskId); 
    const { content, bookmark } = req.body;

    const data = {
        content, bookmark
    };

    try{
        await taskService.updateTask(userId, listId, taskId, data);

        res.sendStatus(httpStatus.OK);        
        return
    }catch(err){
        next(err);
    }
};

export async function deleteTask(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {userId } = req;
    const listId = Number(req.params.listId); 
    const taskId = Number(req.params.taskId); 

    console.log(taskId)
    try{
        await taskService.deleteTask(userId, listId, taskId)
        res.sendStatus(httpStatus.OK);
        return
    }catch(err){
        next(err);
    }
};

export async function createTask(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const {userId } = req;
    const listId = Number(req.params.listId); 
    const { content } = req.body;

    try{
        await taskService.createTask(userId, listId, content);
        res.sendStatus(httpStatus.OK);
        return
    }catch(err){
        next(err);
    }
};