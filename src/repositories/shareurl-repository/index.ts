import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ShareUrlUncheckedCreateInput) {

    return prisma.shareUrl.create({
        data,
    });
    
};

async function deleteShareurl(noteId: number) {

    return prisma.shareUrl.deleteMany({
        where:{
            noteId: noteId,
        },
    });
    
};

const shareUrlRepository = {
    create, deleteShareurl
};

export default shareUrlRepository;