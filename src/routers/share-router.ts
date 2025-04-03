import { getNotesByUrl } from "@/controllers";
import { Router } from "express";

const shareRouter = Router({ mergeParams: true });

shareRouter.get("/:shareLink", getNotesByUrl);



export default shareRouter;