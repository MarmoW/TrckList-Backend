import { ListType } from "@prisma/client";
import listRepository from "@/repositories/list-repository";
import { conflictError, forbiddenError, notFoundError } from "@/errors";
import { badRequestError } from "@/errors";
import { nanoid } from "nanoid";
import sharedListRepository from "@/repositories/sharedlist-repository";


async function createShareCode(userId: number, listId: number, singleUse?: boolean){

    const list = await listRepository.getListById(listId);
    if(!list) throw notFoundError;
    if(list.userId !== userId) throw forbiddenError;

    const link = nanoid(8);

    const data = {
        link: link,
        singleUse: singleUse,
        listId: listId
    };

    return sharedListRepository.createShareCode(data)

};

async function deleteShareCode(userId: number, listId: number, link: string){
    const list = await listRepository.getListById(listId);
    if(!list) throw notFoundError;
    if(list.userId !== userId) throw forbiddenError;

    return sharedListRepository.deleteShareCode(link);
};

async function joinWithCode(userId:number, link:string){

    const listShare = await sharedListRepository.getShareByLink(link);
    if(!listShare) throw notFoundError;

    const userAlreadyJoined = await sharedListRepository.checkAlreadyJoined(userId, listShare.listId);
    if(userAlreadyJoined) throw conflictError;

    const data = {
        userId: userId,
        listId: listShare.listId
    };
 
    if (listShare.singleUse === true ) {
        await sharedListRepository.deleteShareCode(link);    
    }

    return sharedListRepository.create(data);

};

async function leaveListShare(userId: number, noteId: number){

    return sharedListRepository.leaveListShare(userId, noteId);
};

async function getSharedUsers(userId: number, listId: number){

    const list = await listRepository.getListById(listId);
    if(!list) throw notFoundError;
    if(list.userId !== userId) throw forbiddenError;

    return sharedListRepository.getAllSharedUsers(listId);

};

async function revokeUserAccess(userId: number, listId: number, revokedId: number){

    const list = await listRepository.getListById(listId);
    if(!list) throw notFoundError;
    if(list.userId !== userId) throw forbiddenError;

    return sharedListRepository.leaveListShare(revokedId, listId);

};

async function seeAllShareCodes(userId: number, listId: number){
    const list = await listRepository.getListById(listId);
    if(!list) throw notFoundError;
    if(list.userId !== userId) throw forbiddenError;

    return sharedListRepository.getAllSharedUsers(listId);
};


const listShareRepository = {
    createShareCode, deleteShareCode, joinWithCode, leaveListShare, getSharedUsers, revokeUserAccess,
    seeAllShareCodes,
};

export default listShareRepository;