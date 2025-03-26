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
const sharedListRepository = {
    create, deleteSharedlist, isThisUserAllowed
};

export default sharedListRepository;