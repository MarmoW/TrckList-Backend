import { getAllShareCodes, shareList, deleteShareCode, unshareList } from "@/controllers";
import { Router } from "express";

const listShareRouter = Router({ mergeParams: true });

listShareRouter
            .get("/", getAllShareCodes)
            .post("/", shareList)   
            .delete("/", unshareList)
            .delete("/:link", deleteShareCode) ;
        


export default listShareRouter;