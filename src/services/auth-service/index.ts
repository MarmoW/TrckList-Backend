import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";
import userRepository from "@/repositories/user-repository";
import sessionRepository from "@/repositories/session-repository";
import { SignInParams, SignInResult } from "@/protocols";
import { UNAUTHORIZED } from "http-status";
import { badRequestError, unauthorizedError } from "@/errors";

async function signIn(params: SignInParams): Promise<SignInResult>{
    
    const {password, email} = params;

    const user = await fetchUsers(email);

    await passwordValidation(password, user.password);

    const token = await createSession(user.id);


    return {
        user:{id: user.id, 
            email:user.email},
        token
    }
};

type FetchUsersResult = Pick<User, 'id' | 'email' | 'password'>;

async function fetchUsers(email: string): Promise<FetchUsersResult> {
    
    const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });

    if (!user) throw unauthorizedError();
    
    return user;
};
  
async function passwordValidation(password: string, userPassword: string) {
    const validPassword = await bcrypt.compare(password, userPassword);
    if (!validPassword) throw unauthorizedError();
};

async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    await sessionRepository.create({
      token,
      userId,
    });
  
    return token;
};

const authService = {
    signIn,
};

export * from "./errors";
export default authService;