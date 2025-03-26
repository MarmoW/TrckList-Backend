import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import noteService from "@/services/note-service";

export async function getNotes(req: Request, res: Response, next: NextFunction){

    const {listId} = req.body;

    try{
        const notes = await noteService.getAllNotes(listId);
        return res.status(httpStatus.OK).send(notes);
    }catch(err){   
        next(err);

    }
};