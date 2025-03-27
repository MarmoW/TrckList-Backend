import {Router} from "express";
import { authenticateToken } from "@/middlewares";
import { getList, updateList, deleteList, createList } from "@/controllers";

const listsRouter = Router();

listsRouter.use("/*", authenticateToken);

listsRouter
        .get("/", getList)
        .post("/", createList)
        .put("/:listId", updateList)
        .delete("/:listId", deleteList);

export { listsRouter };