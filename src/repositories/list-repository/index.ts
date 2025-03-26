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

async function getListById(listId: number){

  return prisma.list.findUnique({
    where: {
        id: listId,
    },
});
};

async function getListsByUser(userId: number){
  return prisma.list.findMany({
    where:{
      userId: userId,
    },
  })
};

async function deleteList(listId: number){

  return prisma.list.delete({
    where:{
      id: listId,
    },
  }
  );
};

type UpdateListType = {
  name: string;
  ownerId: number;
  sharedId: number;
}

const listRepository = {create, update, getListById, deleteList, getListsByUser};

export default listRepository;