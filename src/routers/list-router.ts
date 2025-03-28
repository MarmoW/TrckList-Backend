import {Router} from "express";
import { authenticateToken } from "@/middlewares";
import { getList, updateList, deleteList, createList } from "@/controllers";
import notesRouter from "./note-router";
import tasksRouter from "./task-router";

const listsRouter = Router();

listsRouter.use("/*", authenticateToken);

listsRouter
        .get("/", getList)
        .post("/", createList)
        .put("/:listId", updateList)
        .delete("/:listId", deleteList);

listsRouter.use("/:listId/notes", notesRouter);
listsRouter.use("/:listId/tasks", tasksRouter);


export { listsRouter };