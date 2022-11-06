import { pool } from "../helper/db.js";
import { sendError, sendSucces, sendErrorServerInterval } from "../helper/client.js";

export const getAllCommentOnLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const [comments]  = await pool.query(
        `SELECT * FROM comment WHERE lesson_id = ?`,
        [lessonId]
        );
        sendSucces(res, comments[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [comments]  = await pool.query(
        `SELECT * FROM comment WHERE id = ?`,
        [id]
        );
        sendSucces(res, comments[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const createComment = async (req, res) => {
    try {
        const { content, lesson_id, user_id } = req.body;
        const [comments]  = await pool.query(
        `INSERT INTO comment (content, lesson_id, user_id) VALUES (?, ?, ?)`,
        [content, lesson_id, user_id]
        );
        sendSucces(res, "Create comment successfully", comments[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const updateCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, lesson_id, user_id } = req.body;
        const [comments]  = await pool.query(
        `UPDATE comment SET content = IFNULL(?, content), lesson_id = IFNULL(?, lesson_id), user_id = IFNULL(?, user_id) WHERE id = ?`,
        [content, lesson_id, user_id, id]
        );
        sendSucces(res, "Update comment successfully", comments[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [comments]  = await pool.query(
        `DELETE FROM comment WHERE id = ?`,
        [id]
        );
        sendSucces(res, "Delete comment successfully", comments[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}