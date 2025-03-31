import { List, ListType } from "@prisma/client";
import {faker} from "@faker-js/faker";
import { prisma } from "@/config";
import { createUser } from "./users-factory";

export async function createListTasks(): Promise<List>{
    const user = await createUser();

    return prisma.list.create({
        data: {
            name: faker.word.noun(),
            userId: user.id,
            listType: ListType.TASKS
        }
    });
};

export async function createListNotes(): Promise<List>{

    const user = await createUser();

    return prisma.list.create({
        data: {
            name: faker.word.noun(),
            userId: user.id,
            listType: ListType.NOTES
        }
    });
};