import { pool } from "../helper/db.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const getAllPosts = async (req, res) => {
    try {
        const [posts] = await pool.query("SELECT * FROM posts");
        return sendSucces(res, posts[0]);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getAllPostByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const [posts] = await pool.query("SELECT * FROM posts WHERE user_id = ?", [id]);
        return sendSucces(res, posts[0]);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const [post] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
        if (post.rows.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "Post not found");
        }
        return sendSucces(res, post[0]);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createPost = async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        const post = await pool.query("INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)", [title, content, authorId]);
        return sendSucces(res, post);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, content, authorId, upVotes } = req.body;
    try {
        const [post] = await pool.query("UPDATE posts SET title = ?, content = ?, authorId = ?, upVotes = ?, WHERE id = ?", [title, content, authorId, upVotes, id]);
        return sendSucces(res, post[0]);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const [post] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
        return sendSucces(res, post[0]);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

