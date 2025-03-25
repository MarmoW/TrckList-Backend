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
            updatedAt: new Date(),
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

const taskRepository = {
    create, update, deleteTask
};

export default taskRepository;