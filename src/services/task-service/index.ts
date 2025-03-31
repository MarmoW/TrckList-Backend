import { badRequestError } from "@/errors/bad-request-error";
import { forbiddenError } from "@/errors/forbidden-error";
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
    
    const list = await listRepository.getListById(listId);
    const task = await taskRepository.getTaskById(taskId);
    
    if(!data.content) {
        if(!task) throw badRequestError;
        if(!list) throw notFoundError;
        if(list.listType !== "TASKS") throw badRequestError;
        if(userId !== list.userId) throw forbiddenError;
        if(data.bookmark !== task.bookmark){        
            return taskRepository.update(taskId, undefined, data.bookmark);
        }else{
            throw badRequestError;
        }
    };
    
    if(!task) throw badRequestError;
    if(!list) throw notFoundError;
    if(list.listType !== "TASKS") throw badRequestError;
    if(userId !== list.userId) throw forbiddenError;

    return taskRepository.update(taskId, data.content, data.bookmark);
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