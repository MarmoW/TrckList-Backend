import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.TaskUncheckedCreateInput) {

    return prisma.task.create({
        data,
    });
    
}

async function update(taskId: number, content?: string, bookmark?: boolean){

    return prisma.task.update({
        where:{
            id: taskId,
        },
        data:{
            content: content,
            bookmark: bookmark,
        },
    })
}

async function deleteTask(taskId: number){
    return prisma.task.delete({
        where:{
            id: taskId,
        },
});
};

async function getTaskById(taskId:number){
    return prisma.task.findUnique({
        where:{
            id: taskId,
    },
})
};

async function getTasksByListId(listId: number){
    return prisma.task.findMany({
        where:{
            listId: listId,
        },
    })
};

const taskRepository = {
    create, update, deleteTask, getTaskById,getTasksByListId
};


export default taskRepository;