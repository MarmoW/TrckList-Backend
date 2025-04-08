import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import noteService from "@/services/note-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getNotesByUrl(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const url = req.params.shareLink;

    try{
        const note = await noteService.getNoteByUrl(url);
        res.status(httpStatus.OK).send({
            id: note.id,
            name: note.name,
            content: note.content
        });
        return
    }catch(err){
        next(err);
    }
};