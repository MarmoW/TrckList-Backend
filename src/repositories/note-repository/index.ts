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

async function deleteNote(taskId: number){
    return prisma.note.delete({
        where:{
            id: taskId,
        },
});
};

const taskRepository = {
    create, update, deleteNote
};

export default taskRepository;