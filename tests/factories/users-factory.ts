import bcrypt from 'bcryptjs';
import {faker} from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<User> = {}): Promise<User> {

    const rawPassword = params.password || faker.internet.password({length: 8});
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    return prisma.user.create({
        data: {
            name: faker.person.firstName(),
            email: params.email || faker.internet.email(),
            password: hashedPassword

        },
    });


}