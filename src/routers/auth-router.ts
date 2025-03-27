import { Router } from "express";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { signInPost } from "@/controllers";

const authRouter = Router(); 
authRouter.post("/sign-in", validateBody(signInSchema), signInPost)

export { authRouter};