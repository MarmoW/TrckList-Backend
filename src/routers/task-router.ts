import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTasks, updateTask, deleteTask, createTask } from "@/controllers";

const tasksRouter = Router();

tasksRouter.use("/tasks", authenticateToken);

tasksRouter
        .get("/tasks", getTasks)