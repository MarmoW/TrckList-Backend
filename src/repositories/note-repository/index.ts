import { Prisma } from '@prisma/client';
import { prisma } from '@/config';


async function create(data: Prisma.NoteUncheckedCreateInput) {

    return prisma.note.create({
        data,
    });
    
}

async function update(noteId: number, content?: string, name?: string, bookmark?: boolean, isShared?: boolean ){

    return prisma.note.update({
        where:{
            id: noteId,
        },
        data:{
            name: name,
            content: content,
            bookmark: bookmark,
            isShared: isShared,
        },
    })
}

async function deleteNote(noteId: number){
    return prisma.note.delete({
        where:{
            id: noteId,
        },
});
};

async function getNoteById(noteId:number){
    return prisma.note.findFirst({
        where:{
            id: noteId,
        },
});
};

async function getNotesByListId(listId: number){
    return prisma.note.findMany({
        where:{
            listId: listId,
        },
        orderBy: [
            { bookmark: 'desc' },
            { updatedAt: 'desc' },
          ],
    })
};

const noteRepository = {
    create, update, deleteNote,getNoteById,getNotesByListId
};

export default noteRepository;