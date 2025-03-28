import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getNotes, updateNotes, deleteNotes, createNotes, shareNotes, unshareNotes ,getNotesById, } from "@/controllers";

const notesRouter = Router();

notesRouter.use("/*", authenticateToken);

notesRouter
        .get("/", getNotes)
        .post("/", createNotes)
        .get("/:noteid", getNotesById)
        .put("/:noteid", updateNotes)
        .put("/:noteid/share", shareNotes)
        .put("/:noteid/unshare", unshareNotes)
        .delete("/:noteid", deleteNotes);

export default notesRouter;