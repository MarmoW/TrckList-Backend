import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ListUncheckedCreateInput) {
    
    return prisma.list.create({
      data,
    });
  };
  

async function update(listId: number, data:{name?:string, bookmark?: boolean}){
  return prisma.list.update({
    where:{
        id: listId,
    },
    data: {
        ...data,
    },
});
};

type UpdateListType = {
  name: string;
  ownerId: number;
  sharedId: number;
}

const listRepository = {create, update};

export default listRepository;