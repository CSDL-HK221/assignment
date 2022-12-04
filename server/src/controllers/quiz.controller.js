import { pool } from "../helper/db.js";
import { sendError, sendSucces, sendErrorServerInterval } from "../helper/client.js";

export const getAllQuizByLessonId= async (req, res) => {
    try {
        const { id } = req.params;
        const [quiz] = await pool.query(`SELECT * FROM quiz WHERE lesson_id = ?`, [id]);
        return sendSucces(res,"Get all quiz successfully" , quiz[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const [quizs]  = await pool.query(
        `SELECT * FROM quiz WHERE id = ?`,
        [id]
        );
        return sendSucces(res, quizs[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createQuiz = async (req, res) => {
    try {
        const { content, lesson_id } = req.body;
        const [quizs]  = await pool.query(
        `INSERT INTO quiz (content, lesson_id) VALUES (?, ?)`,
        [content, lesson_id]
        );
        return sendSucces(res, "Create quiz successfully", quizs[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
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
        return sendSucces(res, "Update quiz successfully", quizs[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const deleteQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const [quizs]  = await pool.query(
        `DELETE FROM quiz WHERE id = ?`,
        [id]
        );
        return sendSucces(res, "Delete quiz successfully", quizs[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const memberLearnQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer_id } = req.body;
        const { user } = res.locals;
        const [quizs]  = await pool.query(
        `CALL INSERT_student_answer(?, ?, ?);`,
        [user[0].id, id, answer_id]
        );
        return sendSucces(res, "Member learn quiz successfully", quizs[0]);
    } catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}
