import { Router } from 'express';
import { createUserSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { userPost } from '@/controllers';


const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), userPost);

export { usersRouter };