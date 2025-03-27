import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";

loadEnv();

//import { handleApplicationError } from "./middlewares";

const app = express();

app
 .use(cors())
 .use(express.json())

export function init(): Promise<Express>{
    connectDb();
    return Promise.resolve(app);
};

export default app;