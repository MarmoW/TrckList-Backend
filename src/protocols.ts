import { User } from '@prisma/client';

export type ApplicationError = {
    name: string;
    message: string;
  };
  
 export type SignInParams = Pick<User, 'email' | 'password'>;

export type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: String;
};

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
}

