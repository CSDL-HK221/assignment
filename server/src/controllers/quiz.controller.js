import { pool } from "../helper/db.js";
import { sendError, sendSucces, sendErrorServerInterval } from "../helper/client.js";

export const getAllQuizByAnswerId = async (req, res) => {
    try {
        const { answerId } = req.params;
        const [quizs]  = await pool.query(
        `SELECT * FROM quiz WHERE answer_id = ?`,
        [answerId]
        );
        sendSucces(res, quizs[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const [quizs]  = await pool.query(
        `SELECT * FROM quiz WHERE id = ?`,
        [id]
        );
        sendSucces(res, quizs[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const createQuiz = async (req, res) => {
    try {
        const { content, lesson_id } = req.body;
        const [quizs]  = await pool.query(
        `INSERT INTO quiz (content, lesson_id) VALUES (?, ?)`,
        [content, lesson_id]
        );
        sendSucces(res, "Create quiz successfully", quizs[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const updateQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, lesson_id } = req.body;
        const [quizs]  = await pool.query(
        `UPDATE quiz SET content = IFNULL(?, content), lesson_id = IFNULL(?, lesson_id) WHERE id = ?`,
        [content, lesson_id, id]
        );
        sendSucces(res, "Update quiz successfully", quizs[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const deleteQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const [quizs]  = await pool.query(
        `DELETE FROM quiz WHERE id = ?`,
        [id]
        );
        sendSucces(res, "Delete quiz successfully", quizs[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}
