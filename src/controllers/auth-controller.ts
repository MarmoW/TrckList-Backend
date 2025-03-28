import { Request, Response } from "express";
import httpStatus from "http-status";
import authService from "@/services/auth-service";
import { SignInParams } from "@/protocols";

export async function signInPost(req: Request, res: Response){

    const {email, password} = req.body as SignInParams;

    try{
        const result = await authService.signIn({email, password});
        
        res.status(httpStatus.OK).send(result);
        console.log(result);
        return
    }catch(err){
        res.status(httpStatus.UNAUTHORIZED).send({});
        return
    }
};