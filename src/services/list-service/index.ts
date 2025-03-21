import { List, ListType } from "@prisma/client";
import listRepository from "@/repositories/list-repository";


type CreateListResponse = {
    name: string;
    id: number;
    listType: ListType
};


export async function createList(userId: number, listType: ListType, name: string): Promise<CreateListResponse>{

    return listRepository.create({
        name,
        userId,
        listType
    });
};