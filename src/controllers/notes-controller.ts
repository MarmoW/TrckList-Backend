import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import noteService from "@/services/note-service";
import { AuthenticatedRequest } from "@/middlewares";

//check list: update, delete, create, getbyid, getnotes,
export async function getNotes(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const {listId} = req.body;

    try{
        const notes = await noteService.getAllNotes(listId);
        res.status(httpStatus.OK).send(notes);
        return 
    }catch(err){   
        next(err);

    }
};

export async function updateNote(req: AuthenticatedRequest, res: Response, next: NextFunction){
    
    const { userId } = req;
    const { name, content, bookmark } = req.body;
    const noteId = Number(req.params.noteId);
    //const listId = Number(req.params.listId); 

    const data = {
        name,
        content,
        bookmark
    };
    
    try{
        const updatedNote = await noteService.updateNote(userId, noteId, data);
        res.status(httpStatus.OK).send(updatedNote);
        return
    }catch(err){
        next(err);
    }
};

export async function deleteNote(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const { userId } = req;
    const noteId = Number(req.params.noteId);

    try{
        await noteService.deleteNote(userId, noteId);
        res.sendStatus(httpStatus.OK);
        return

    }catch(err){
        next(err);
    }
};

export async function createNotes(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const { userId } = req;
    const {name, content} = req.body;

    const listId = Number(req.params.listId); 

    try{
        const newNote = await noteService.createNote(listId, userId, name, content);
        res.status(httpStatus.OK).send(newNote);
        return
    }catch(err){
        next(err);
    } 
}

export async function shareNote(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const {userId} = req;
    const noteId = Number(req.params.noteId);
    

    try{
        const sharedLink = await noteService.shareNote(userId, noteId);
        res.status(httpStatus.OK).send(sharedLink);
        return
    }catch(err){
        next(err);
    }
};

export async function unshareNote(req: AuthenticatedRequest, res: Response, next:NextFunction){

    const {userId} = req;
    const noteId = Number(req.params.noteId);
    
    try{
        await noteService.unshareNote(userId, noteId);
        res.sendStatus(httpStatus.OK);
        return
    }catch(err){
        next(err);
    }
};

export async function getNoteById(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const noteId = Number(req.params.noteId);

    try{
        const note = await noteService.getNoteById(noteId);

        res.status(httpStatus.OK).send(note);
        return

    }catch(err){
        next(err);
    }
};