import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ListUncheckedCreateInput) {
    
    return prisma.list.create({
      data,
    });
  };
  

type UpdateListType = {
    name: string;
    ownerId: number;
    sharedId: number;
}
async function update(data: UpdateListType){};

 
const listRepository = {create, update};

export default listRepository;