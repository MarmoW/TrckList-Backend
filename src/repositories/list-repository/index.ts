import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ListUncheckedCreateInput) {
    
    return prisma.list.create({
      data,
    });
  };
  
const listRepository = {create};

export default listRepository;