import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getNotes, updateNotes, deleteNotes, createNotes, shareNotes, unshareNotes ,getNotesById, } from "@/controllers";

const notesRouter = Router({ mergeParams: true });

notesRouter.use("/*", authenticateToken);

notesRouter
        .get("/", getNotes)
        .post("/", createNotes)
        .get("/:noteId", getNotesById)
        .put("/:noteId", updateNotes)
        .put("/:noteId/share", shareNotes)
        .put("/:noteId/unshare", unshareNotes)
        .delete("/:noteId", deleteNotes);

export default notesRouter;