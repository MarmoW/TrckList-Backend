import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import taskService from "@/services/task-service";
import listRepository from "@/repositories/list-repository";

export async function getTasks(req: Request, res: Response, next: NextFunction){

    const {listId} = req.body;

    try{
        const notes = await taskService.getAllTaks(listId);
        res.status(httpStatus.OK).send(notes);
        return
    }catch(err){   
        next(err);

    }
};

export async function updateTask(req: Request, res: Response, next: NextFunction){
    const {listId, userId, taskId, data} = req.body;

    try{
        await taskService.updateTask(userId, listId, listId, data);
        res.sendStatus(httpStatus.OK);
        
        return
    }catch(err){
        next(err);
    }
};

export async function deleteTask(req: Request, res: Response, next: NextFunction){
    const { userId, listId, taskId } = req.body;

    try{
        await taskService.deleteTask(userId, listId, taskId)
        return
    }catch(err){
        next(err);
    }
};

export async function createTask(req: Request, res: Response, next: NextFunction){
    const {userId, listId, content} = req.body;

    try{
        await taskService.createTask(userId, listId, content);
        return
    }catch(err){
        next(err);
    }
};