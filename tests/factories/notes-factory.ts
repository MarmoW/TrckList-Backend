import {faker} from "@faker-js/faker";
import { prisma } from "@/config";
import { Note } from "@prisma/client";
import { createListNotes } from "./lists-factory";

export async function createNote(): Promise<Note> {

    const list = await createListNotes();

    return prisma.note.create({
        data:{
            name: faker.word.noun(),
            listId: list.id,
            content: faker.lorem.paragraph(1)
        }
    });
    
};