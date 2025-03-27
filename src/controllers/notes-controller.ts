import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import noteService from "@/services/note-service";


export async function getNotes(req: Request, res: Response, next: NextFunction){

    const {listId} = req.body;

    try{
        const notes = await noteService.getAllNotes(listId);
        res.status(httpStatus.OK).send(notes);
        return 
    }catch(err){   
        next(err);

    }
};

export async function updateNotes(req: Request, res: Response, next: NextFunction){
    const {userId, listId, noteId, data} = req.body;

    try{
        const updatedNote = await noteService.updateNote(userId, noteId, data);
        res.status(httpStatus.OK).send(updatedNote);
        return
    }catch(err){
        next(err);
    }
};

export async function deleteNotes(req: Request, res: Response, next: NextFunction){
    const {userId, noteId} = req.body;

    try{
        await noteService.deleteNote(userId, noteId);
        res.sendStatus(httpStatus.OK);
        return

    }catch(err){
        next(err);
    }
};

export async function createNotes(req: Request, res: Response, next: NextFunction){

    const {listId, userId, name, content} = req.body;
    try{
        const newNote = await noteService.createNote(listId, userId, name, content);
        res.status(httpStatus.OK).send(newNote);
        return
    }catch(err){
        next(err);
    } 
}

export async function shareNotes(req: Request, res: Response, next: NextFunction){
    const {userId, noteId} = req.body;

    try{
        const sharedLink = await noteService.shareNote(userId, noteId);
        res.status(httpStatus.OK).send(sharedLink);
        return
    }catch(err){
        next(err);
    }
};

export async function unshareNotes(req: Request, res: Response, next:NextFunction){

    const {userId, noteId} = req.body

    try{
        await noteService.unshareNote(userId, noteId);
        res.sendStatus(httpStatus.OK);
        return
    }catch(err){
        next(err);
    }
};

export async function getNotesById(req: Request, res: Response, next: NextFunction){

    const {noteId} = req.body;

    try{
        const note = await noteService.getNoteById(noteId);

        res.send(httpStatus.OK).send(note);
        return

    }catch(err){
        next(err);
    }
};