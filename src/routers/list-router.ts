import {Router} from "express";
import { authenticateToken } from "@/middlewares";
import { getList, updateList, deleteList, createList } from "@/controllers";

const listsRouter = Router();

listsRouter.use("/lists*", authenticateToken);

listsRouter
        .get("/lists", getList)
        .post("/lists", createList)
        .put("/lists/:listId", updateList)
        .delete("/lists/:listId", deleteList);

export { listsRouter };