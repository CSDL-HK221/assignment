import { pool } from "../helper/db.js";
import { sendError,  sendSucces, sendErrorServerInterval } from "../helper/client.js";

export const getAllAnswersByQuizId = async (req, res) => {
    try {
        const { id } = req.params;
        const [answers] = await pool.query(`SELECT * FROM answer WHERE quiz_id = ?`, [id]);
        return sendSucces(res,"Get all answers successfully" , answers[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getAnswerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [answers]  = await pool.query(
        `SELECT * FROM answer WHERE id = ?`,
        [id]
        );
        return sendSucces(res, answers[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createAnswer = async (req, res) => {
    try {
        const { content, is_correct, quiz_id } = req.body;
        const [answers]  = await pool.query(
        `INSERT INTO answer (content, is_correct, quiz_id) VALUES (?, ?, ?)`,
        [content, is_correct, quiz_id]
        );
        return sendSucces(res, "Create answer successfully", answers[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const updateAnswerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, is_correct, quiz_id } = req.body;
        const [answers]  = await pool.query(
        `UPDATE answer SET content = IFNULL(?, content), is_correct = IFNULL(?, is_correct), quiz_id = IFNULL(?, quiz_id) WHERE id = ?`,
        [content, is_correct, quiz_id, id]
        );
        return sendSucces(res, "Update answer successfully", answers[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const deleteAnswerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [answers]  = await pool.query(
        `DELETE FROM answer WHERE id = ?`,
        [id]
        );
        return sendSucces(res, "Delete answer successfully", answers[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}