import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import userRepository from "@/repositories/user-repository";
import { CreateUserParams } from "@/protocols";
import { duplicatedEmailError } from "@/errors/duplicated-email-error";

 
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

const userService = {
    createUser
};

export default userService;