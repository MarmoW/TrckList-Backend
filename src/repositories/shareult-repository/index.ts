import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ShareUrlUncheckedCreateInput) {

    return prisma.shareUrl.create({
        data,
    });
    
};

async function deleteShareurl(shareUrlId: number) {

    return prisma.shareUrl.delete({
        where:{
            id: shareUrlId,
        },
    });
    
};

const shareUrlRepository = {
    create, deleteShareurl
};

export default shareUrlRepository;