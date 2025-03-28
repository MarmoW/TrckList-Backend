import Joi from "joi";
import { CreateUserParams } from "@/protocols";

export const createUserSchema = Joi.object<CreateUserParams>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
