import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/user-service';


export async function userPost(req: Request, res:Response){
    const {email, password, name} = req.body;

    try{
        const user = await userService.createUser({email, password, name});
        
        res.status(httpStatus.CREATED).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
        return
    }catch(err){
        if(err.name === 'DuplicatedEmailError'){
           res.status(httpStatus.CONFLICT).send(err);
           return
        }
       res.status(httpStatus.BAD_REQUEST).send(err);
       return
    }
};
