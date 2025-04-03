import {Router} from "express";
import { authenticateToken } from "@/middlewares";
import { getList, updateList, deleteList, createList } from "@/controllers";
import notesRouter from "./note-router";
import tasksRouter from "./task-router";
import { joinSharedList, getAllSharedUsers, revokeUserAccess, leaveSharedList } from "@/controllers";
import listShareRouter from "./list-share-router";

const listsRouter = Router();

listsRouter.use("/*", authenticateToken);

listsRouter
        .get("/", getList)
        .get("/:listId/users", getAllSharedUsers)
        .post("/", createList)
        .post("/join", joinSharedList)
        .put("/:listId", updateList)
        .delete("/:listId", deleteList)
        .delete("/:listId/users", revokeUserAccess)
        .delete("/:listId/leave", leaveSharedList);
        
        

listsRouter.use("/:listId/notes", notesRouter);
listsRouter.use("/:listId/tasks", tasksRouter);
listsRouter.use("/:listId/share", listShareRouter);



export { listsRouter };