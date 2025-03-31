import { getNotesByUrl } from "@/controllers";
import { Router } from "express";

const shareRouter = Router();

shareRouter.get("/:shareLink", getNotesByUrl);


export default shareRouter;