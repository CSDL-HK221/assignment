import { pool } from "../helper/db.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM posts");
        sendSucces(res, posts.rows);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (post.rows.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "Post not found");
        }
        sendSucces(res, post.rows[0]);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await pool.query(
            "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );
        sendSucces(res, newPost.rows[0]);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (post.rows.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "Post not found");
        }
        const updatePost = await pool.query(
            "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, id]
        );
        sendSucces(res, updatePost.rows[0]);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (post.rows.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "Post not found");
        }
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        sendSucces(res, "Post was deleted");
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}




