import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTasks, updateTask, deleteTask, createTask } from "@/controllers";

const tasksRouter = Router();

tasksRouter.use("/*", authenticateToken);

tasksRouter
        .get("/", getTasks)
        .post("/", createTask)
        .put("/:taskid", updateTask)
        .delete("/:taskid", deleteTask);

export default tasksRouter;