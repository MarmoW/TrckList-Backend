import { badRequestError } from "@/errors/bad-request-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import listRepository from "@/repositories/list-repository";
import noteRepository from "@/repositories/note-repository";
import shareUrlRepository from "@/repositories/shareurl-repository";
import { Note } from "@prisma/client";
import { nanoid } from 'nanoid';

export async function createNote(userId: number, listId: number, name: string, content:string): Promise<Note>{

    const list = await listRepository.getListById(listId);

    if(list.userId !== userId) throw forbiddenError;

    return noteRepository.create({
        listId,
        name,
        content,
    });
};

export async function deleteNote(userId: number, noteId: number, listId:number){
    
    const list = await listRepository.getListById(listId);
    if(list.userId !== userId) throw forbiddenError;

    const note = await noteRepository.getNoteById(noteId);
    if(!note) throw notFoundError;

    return noteRepository.deleteNote(noteId);

};


export async function shareNote(userId: number, noteId:number, listId:number){

    const list = await listRepository.getListById(listId);
    if(list.userId !== userId) throw forbiddenError;

    const note = await noteRepository.getNoteById(noteId);
    if(!note) throw notFoundError;
    if(note.isShared === true) throw badRequestError; 

    const isShared = true;

    noteRepository.update(noteId, undefined, undefined, undefined, isShared);

    const link = nanoid(8);

    shareUrlRepository.create({
        noteId,
        link
    });
    
    return link;

};

export async function unshareNote(userId: number, noteId: number, listId: number){
    
    const list = await listRepository.getListById(listId);
    if(list.userId !== userId) throw forbiddenError;

    const note = await noteRepository.getNoteById(noteId);
    if(!note) throw notFoundError;
    if(note.isShared === false) throw badRequestError; 

    shareUrlRepository.deleteShareurl(noteId);

    const isShared = false;

    return noteRepository.update(noteId, undefined, undefined, undefined, isShared);


};