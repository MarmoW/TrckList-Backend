import { badRequestError } from "@/errors/bad-request-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { noContentError } from "@/errors/no-content-error";
import { notFoundError } from "@/errors/not-found-error";
import listRepository from "@/repositories/list-repository";
import noteRepository from "@/repositories/note-repository";
import shareUrlRepository from "@/repositories/shareurl-repository";
import { Note } from "@prisma/client";
import { nanoid } from 'nanoid';

async function createNote(listId: number, userId: number,  name: string, content:string): Promise<Note>{

    const list = await listRepository.getListById(listId);

    if(list.listType !== "NOTES") throw forbiddenError;
    if(list.userId !== userId) throw forbiddenError;

    return noteRepository.create({
        listId,
        name,
        content,
    });
};

async function deleteNote(userId: number, noteId: number){
    

    const note = await noteRepository.getNoteById(noteId);
    if(!note) throw notFoundError;
    const list = await listRepository.getListById(note.listId);
    if(list.userId !== userId) throw forbiddenError;

    return noteRepository.deleteNote(noteId);

};

async function updateNote(userId: number, noteId: number, data:{name?: string, content?: string, bookmark?: boolean}){
    if(!data.name && !data.content) {

        const note = await noteRepository.getNoteById(noteId);
         const list = await listRepository.getListById(note.listId)
         if(!note) throw notFoundError;
         if(list.userId !== userId) throw forbiddenError;
         if(note.bookmark !== data.bookmark){
            return noteRepository.update(noteId, undefined, undefined , data.bookmark, undefined );};
            throw noContentError;
        };

    const note = await noteRepository.getNoteById(noteId);
    const list = await listRepository.getListById(note.listId)
    if(!note) throw notFoundError;
    if(list.userId !== userId) throw forbiddenError;

    return noteRepository.update(noteId, data.content, data.name, data.bookmark, undefined );

};

async function shareNote(userId: number, noteId:number){

    const note = await noteRepository.getNoteById(noteId);
    if(!note) throw notFoundError;
    if(note.isShared === true) throw badRequestError; 
    const list = await listRepository.getListById(note.listId);
    if(list.userId !== userId) throw forbiddenError;

    const isShared = true;

    noteRepository.update(noteId, undefined, undefined, undefined, isShared);

    const link = nanoid(10);

    shareUrlRepository.create({
        noteId,
        link
    });
    
    return link;

};

async function unshareNote(userId: number, noteId: number){
    
    const note = await noteRepository.getNoteById(noteId);
    if(!note) throw notFoundError;
    if(note.isShared === false) throw badRequestError; 
    const list = await listRepository.getListById(note.listId);
    if(list.userId !== userId) throw forbiddenError;

    shareUrlRepository.deleteShareurl(noteId);

    const isShared = false;

    return noteRepository.update(noteId, undefined, undefined, undefined, isShared);


};

async function getAllNotes(listId:number){
    return noteRepository.getNotesByListId(listId);
};

async function getNoteById(noteId: number){
    const note = await noteRepository.getNoteById(noteId);

    if(!note) throw notFoundError;
    return note;
};

async function getNoteByUrl(link: string){
    const share = await shareUrlRepository.getShareByUrl(link);
    
    if(!share) throw badRequestError;
    const note = await noteRepository.getNoteById(share.noteId);
     
    if(!note) throw badRequestError;
    if(note.isShared === false) throw forbiddenError;

    return note;
};

const noteService = {
    createNote, deleteNote, updateNote, shareNote, unshareNote, getAllNotes, getNoteById, getNoteByUrl
};

export default noteService;