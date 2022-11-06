import { Router } from "express";
import { getAllCommentOnLesson, getCommentById, createComment, updateCommentById, deleteCommentById  } from "../controllers/comment.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("this is comment route");
});
router.get("/getAll/:id", getAllCommentOnLesson);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateCommentById);
router.delete("/:id", deleteCommentById);

export default router;