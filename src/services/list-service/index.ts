import { ListType } from "@prisma/client";
import listRepository from "@/repositories/list-repository";
import sharedListRepository from "@/repositories/sharedlist-repository";
import { forbiddenError } from "@/errors";
import { badRequestError } from "@/errors";
import { noContentError } from "@/errors";
import { nanoid } from "nanoid";


type CreateListResponse = {
    name: string;
    id: number;
    listType: ListType
};

async function createList(userId: number, listType: ListType, name: string): Promise<CreateListResponse>{


    return listRepository.create({
        name,
        userId,
        listType
    });
};

async function updateList(listId: number, userId:number, data:{name?:string, bookmark?: boolean}){
    
    if(!data.name && !data.bookmark) throw noContentError;

    //2 Simple queries pro: simple code, more reusability cons: slower than single joint query
    const [isOwner] = await Promise.all([
        listRepository.getListById(listId)
      ]);
    
      console.log(userId, isOwner.userId)
    if(userId !== isOwner.userId) throw forbiddenError;
    
    if(isOwner.name === data.name && isOwner.bookmark === data.bookmark) throw badRequestError;   
    

    return listRepository.update(
        listId,
        data,
    );
};

async function deleteList(listId: number, userId: number) {

    const list = await listRepository.getListById(listId);

    if(userId !== list.userId) throw forbiddenError;

    return listRepository.deleteList(listId);
};

async function getUserLists(userId: number){

    return listRepository.getListsByUser(userId);
};

const listService = {
    createList, updateList, deleteList, getUserLists
};

export default listService;