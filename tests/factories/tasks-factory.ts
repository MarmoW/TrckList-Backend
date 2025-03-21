import {faker} from "@faker-js/faker";
import { prisma } from "@/config";
import { Task } from "@prisma/client";
import { createListTasks } from "./lists-factory";

export async function createTask(): Promise<Task> {

    const list = await createListTasks();

    return prisma.note.create({
        data:{
            name: faker.word.noun(),
            listId: list.id,
            content: faker.lorem.sentence()
        }
    });
    
};