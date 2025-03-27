import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getNotes, updateNotes, deleteNotes, createNotes, shareNotes, unshareNotes ,getNotesById, } from "@/controllers";

const notesRouter = Router();

notesRouter.use("/lists/:listid/notes*", authenticateToken);

notesRouter
        .get("/lists/:listid/notes", getNotes)
        .post("/lists/:listid/notes", createNotes)
        .get("/lists/:listid/notes/:noteid", getNotesById)
        .put("/lists/:listid/notes/:noteid", updateNotes)
        .put("/lists/:listid/notes/:noteid/share", shareNotes)
        .put("/lists/:listid/notes/:noteid/unshare", unshareNotes)
        .delete("/lists/:listid/notes/:noteid", deleteNotes);

export default notesRouter;