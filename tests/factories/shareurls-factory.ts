import { prisma } from "@/config";
import { ShareUrl } from "@prisma/client";
import { nanoid } from "nanoid";
import { createNote } from "./notes-factory";


export async function createShareurl():Promise<ShareUrl>{

    const note = await createNote();

    return prisma.shareUrl.create({
        data:{
            noteId: note.id,
            link: nanoid(10)
        }
    });
};