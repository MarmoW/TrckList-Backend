import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";
import { authRouter } from "./routers/auth-router";
import { usersRouter } from "./routers/user-router";
import { handleApplicationError } from "./middlewares";
import { listsRouter } from "./routers/list-router";

loadEnv();

//import { handleApplicationError } from "./middlewares";

const app = express();

app
 .use(cors())
 .use(express.json())
 .use("/auth", authRouter)
 .use("/users", usersRouter)
 .use("/lists", listsRouter)

export function init(): Promise<Express>{
    connectDb();
    return Promise.resolve(app);
};

export default app;