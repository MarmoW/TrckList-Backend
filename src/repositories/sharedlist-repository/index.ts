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

const sharedListRepository = {
    create, deleteSharedlist, isThisUserAllowed, createShareCode, deleteShareCode, getShareByLink, checkAlreadyJoined
};

export default sharedListRepository;