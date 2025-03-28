import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTasks, updateTask, deleteTask, createTask } from "@/controllers";

const tasksRouter = Router({ mergeParams: true });

tasksRouter.use("/*", authenticateToken);

tasksRouter
        .get("/", getTasks)
        .post("/", createTask)
        .put("/:taskId", updateTask)
        .delete("/:taskId", deleteTask);

export default tasksRouter;