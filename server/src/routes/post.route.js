import { Router } from "express";
import { getAllPosts, getPostById, getAllPostByUserId, createPost, deletePostById, updatePostById } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:id", getAllPostByUserId);
router.post("/", createPost);
router.delete("/:id", deletePostById);
router.put("/:id", updatePostById);

export default router;