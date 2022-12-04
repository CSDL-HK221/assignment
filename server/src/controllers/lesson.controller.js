import { pool } from "../helper/db.js";
import { sendError, sendSucces, sendErrorServerInterval } from "../helper/client.js";

export const getAllLessonsFromCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const [lessons] = await pool.query(`SELECT * FROM lesson WHERE course_id = ?`, [id]);
        return sendSucces(res,"Get all lessons successfully" , lessons[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const [lesson] = await pool.query(`SELECT * FROM lesson WHERE id = ?`, [id]);
        return sendSucces(res,"Get lesson successfully" , lesson[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createLesson = async (req, res) => {
    try {
        const { name, content, course_id, length } = req.body;
        const [lesson] = await pool.query(`INSERT INTO lesson (name, content, course_id, length) VALUES (?, ?, ?, ?)`, [name, content, course_id, length]);
        return sendSucces(res,"Create lesson successfully" , lesson[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const updateLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, content, course_id, length } = req.body;
        const [lesson] = await pool.query(`UPDATE lesson SET name = IFNULL(?, name), content = IFNULL(?, content), course_id = IFNULL(?, course_id), length = IFNULL(?, length) WHERE id = ?`, [name, content, course_id, length, id]);
        return sendSucces(res,"Update lesson successfully" , lesson[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const deleteLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const [lesson] = await pool.query(`DELETE FROM lesson WHERE id = ?`, [id]);
        return sendSucces(res,"Delete lesson successfully" , lesson[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const memberLearnLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;
        const [lesson] = await pool.query(`INSERT INTO lesson_member (lesson_id, member_id) VALUES (?, ?)`, [id, user[0].id]);
        return sendSucces(res,"Member learn lesson successfully" , lesson[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}