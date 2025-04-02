import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.SharedListUncheckedCreateInput) {

    return prisma.sharedList.create({
        data,
    });
};

async function deleteSharedlist(sharedListId: number){

    return prisma.sharedList.delete({
        where:{
            id: sharedListId,
        },
    });
};

async function isThisUserAllowed(listId: number, userId: number){
    return prisma.sharedList.findFirst({
        where:{
            listId: listId,
            userId: userId,
        },
    });
};

async function createShareCode(data: Prisma.ShareListCodeUncheckedCreateInput){

    return prisma.shareListCode.create({
        data
    });
};

async function deleteShareCode(link: string){
    return prisma.shareListCode.delete({
        where:{
            link: link,
        },
    });
};

async function getShareByLink(link: string){
    return prisma.shareListCode.findFirst({
        where:{
            link:link,
        },
    })
};

async function checkAlreadyJoined(userId: number, listId: number) {
    return prisma.sharedList.findFirst({
        where:{
            userId: userId,
            listId: listId
        },
    })
};

async function leaveListShare(userId: number, listId: number){
    const findShare = await prisma.sharedList.findFirst({
        where:{
            userId: userId,
            listId: listId
        }
    });

    return prisma.sharedList.delete({
        where:{
            id: findShare.id
        },
    });
};

async function getAllSharedUsers(listId: number){

    return prisma.sharedList.findMany({
        where:{
            listId: listId,
        },
    })
};

async function getAllShareCodes(listId: number){
    return prisma.sharedList.findMany({
        where:{
         listId:listId,
        },
    });
};

const sharedListRepository = {
    create, deleteSharedlist, isThisUserAllowed, createShareCode, deleteShareCode, getShareByLink,
    checkAlreadyJoined, leaveListShare, getAllSharedUsers, getAllShareCodes
};

export default sharedListRepository;