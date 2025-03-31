import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createUser } from './factories';
import { createSession } from './factories'; 
import { prisma } from '@/config';

export async function cleanDb() {
    await prisma.user.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.list.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.note.deleteMany({});
    await prisma.shareUrl.deleteMany({});
    await prisma.sharedList.deleteMany({});
    await prisma.passwordResetToken.deleteMany({});
};

export async function createValidToken(user?: User){
    const incUser = user || (await createUser());
    const token = jwt.sign({ userId: incUser.id}, process.env.JWT_SECRET);

    await createSession(token);

    return token;
};