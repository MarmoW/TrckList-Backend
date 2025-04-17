import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import userRepository from "@/repositories/user-repository";
import { CreateUserParams } from "@/protocols";
import { duplicatedEmailError } from "@/errors/duplicated-email-error";
import { notFoundError } from "@/errors";
import nodemailer from "nodemailer";

 
export async function createUser({email, password, name}: CreateUserParams) : Promise<User>{

    await validateUniqueEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);
        
    return userRepository.create({
        name,
        email,
        password: hashedPassword
    }); 

};

async function validateUniqueEmail(email: string){
    const emailAlreadyInUse = await userRepository.findByEmail(email);
    if(emailAlreadyInUse) {
        throw duplicatedEmailError()
    }
};

export async function recoverPw(email: string){
    const valUser = await userRepository.findByEmail(email)
    if(!valUser) throw notFoundError;

    const token = jwt.sign({ sub: valUser.id }, process.env.JWT_SECRET, {expiresIn : "1h" });
    const data = {userId: valUser.id, code: token};

    await userRepository.createPwRecToken(data);

    await sendEmail({
        to: email,
        subject: 'Recuperar Senha',
        recLink: `<p>Token para redefinir sua senha: ${token}</p>`,
      });
};

async function sendEmail(data:{to: string, subject: string, recLink: string}){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.REC_EMAIL,
          pass: process.env.REC_PW,
        },
      });
      
};

const userService = {
    createUser, recoverPw
};

export default userService;