import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {

    const params: Prisma.UserFindUniqueArgs = {
        where: {
            email,
        },
    };

    if (select) {
        params.select = select;
    }

    return prisma.user.findUnique(params);
};

async function create(data: Prisma.UserUncheckedCreateInput) {

    return prisma.user.create({
        data,
    })
};

async function editUser(userId: number, data:{name?:string, email?:string, password?:string}){    

    return prisma.user.update({
        where:{
            id: userId,
        },
        data: {
            ...data,
        },
    });
}


const userRepository = {
    findByEmail, create, editUser
};

export default userRepository;