import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getNotes, updateNote, deleteNote , createNotes, shareNote, unshareNote ,getNoteById, } from "@/controllers";

const notesRouter = Router({ mergeParams: true });

notesRouter.use("/*", authenticateToken);

notesRouter
        .get("/", getNotes)
        .post("/", createNotes)
        .get("/:noteId", getNoteById)
        .put("/:noteId", updateNote)
        .put("/:noteId/share", shareNote)
        .put("/:noteId/unshare", unshareNote)
        .delete("/:noteId", deleteNote);

export default notesRouter;