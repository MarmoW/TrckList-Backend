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

async function getShareByUrl(link: string){

    return prisma.shareUrl.findFirst({
        where:{
            link: link,
        },
    })
};


const shareUrlRepository = {
    create, deleteShareurl, getShareByUrl
};

export default shareUrlRepository;