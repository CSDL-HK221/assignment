import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("this is post route");
});

router.get("/all", getAllPosts);
router.get("/:id", getPostById);
router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;