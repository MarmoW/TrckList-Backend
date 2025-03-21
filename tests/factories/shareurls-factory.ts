import {faker} from "@faker-js/faker";
import { prisma } from "@/config";
import { ShareUrl } from "@prisma/client";
import { createNote } from "./notes-factory";
import { nanoid } from "nanoid";

export async function createShareurl():Promise<ShareUrl>{

    const note = await createNote();

    return prisma.shareUrl.create({
        data:{
            noteId: note.id,
            link: nanoid(10)
        }
    });
};