import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTasks, updateTask, deleteTask, createTask } from "@/controllers";

const tasksRouter = Router();

tasksRouter.use("/lists/:listid/tasks*", authenticateToken);

tasksRouter
        .get("/lists/:listid/tasks", getTasks)
        .post("/lists/:listid/tasks", createTask)
        .put("/lists/:listid/tasks/:taskid", updateTask)
        .delete("/lists/:listid/tasks/:taskid", deleteTask);

export default tasksRouter;