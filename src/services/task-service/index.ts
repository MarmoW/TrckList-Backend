import { badRequestError } from "@/errors/bad-request-error";
import { forbiddenError } from "@/errors/forbidden-error";
import { noContentError } from "@/errors/no-content-error";
import { notFoundError } from "@/errors/not-found-error";
import listRepository from "@/repositories/list-repository";
import taskRepository from "@/repositories/task-repository";




async function createTask(userId: number, listId:number, content: string){

    const list = await listRepository.getListById(listId);

    if(!list) throw notFoundError;
    if(list.listType !== "TASKS") throw badRequestError;
    if(userId !== list.userId) throw forbiddenError;

    return taskRepository.create({
        listId,
        content
    });

}; 

async function updateTask(userId:number, listId: number,taskId:number, data:{content?: string, bookmark?: boolean}){
    
    if(!data.content && !data.bookmark) throw noContentError;
    
    const list = await listRepository.getListById(listId);
    const task = await taskRepository.getTaskById(taskId);

    if(!task) throw badRequestError;
    if(!list) throw notFoundError;
    if(list.listType !== "TASKS") throw badRequestError;
    if(userId !== list.userId) throw forbiddenError;

    return taskRepository.update(taskId);


};

async function deleteTask(userId:number, listId: number, taskId: number){

    const list = await listRepository.getListById(listId);
    const task = await taskRepository.getTaskById(taskId);

    if(!task) throw badRequestError;
    if(userId !== list.userId) throw forbiddenError;

    return taskRepository.deleteTask(taskId);
};

async function getAllTaks(listId:number){
    return taskRepository.getTasksByListId(listId);
};

const taskService = {
    createTask, updateTask, deleteTask, getAllTaks
};

export default taskService;