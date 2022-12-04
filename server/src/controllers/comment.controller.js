import { pool } from "../helper/db.js";
import { sendError, sendSucces, sendErrorServerInterval } from "../helper/client.js";

export const getAllCommentOnLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const [comments]  = await pool.query(
        `SELECT * FROM comment WHERE lesson_id = ?`,
        [lessonId]
        );
        return sendSucces(res, comments[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getAllCOmmentOnPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const [comments]  = await pool.query(
        `SELECT * FROM comment WHERE post_id = ?`,
        [postId]
        );
        return sendSucces(res, comments[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [comments]  = await pool.query(
        `SELECT * FROM comment WHERE id = ?`,
        [id]
        );
        return sendSucces(res, comments[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createComment = async (req, res) => {
    try {
        const { content, lesson_id, user_id } = req.body;
        const [comments]  = await pool.query(
        `INSERT INTO comment (content, lesson_id, post_id, user_id) VALUES (?, ?, ?, ?)`,
        [content, lesson_id, user_id]
        );
        return sendSucces(res, "Create comment successfully", comments[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const updateCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, user_id } = req.body;
        const [comments]  = await pool.query(
        `UPDATE comment SET content = IFNULL(?, content) WHERE id = ?`,
        [content, id]
        );
        return sendSucces(res, "Update comment successfully", comments[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [comments]  = await pool.query(
        `DELETE FROM comment WHERE id = ?`,
        [id]
        );
        return sendSucces(res, "Delete comment successfully", comments[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}