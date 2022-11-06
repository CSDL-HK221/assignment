import { pool } from '../helper/db.js';
import { sendSucces, sendError, sendErrorServerInterval, HttpStatusCode } from '../helper/client.js';

export const getAllCourses = async (req, res) => {
    try {
        const [course] = await pool.query('SELECT * FROM course');
        sendSucces(res, 'Get all courses successfully', course);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const getCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        sendSucces(res, HttpStatusCode.OK, course[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const createCourse = async (req, res) => {
    const { name, description, lesson, authorId, category, relatedCourse } = req.body;
    try {
        const [course] = await pool.query('INSERT INTO course (name, description, lesson, authorId, category, relatedCourse) VALUES (?, ?, ?, ?, ?, ?)', [name, description, lesson, authorId, category, relatedCourse]);
        sendSucces(res, 'Create course successfully', course[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const updateCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, lesson, authorId, category, relatedCourse } = req.body;
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        await pool.query('UPDATE course SET name = IFNULL(?, name), description = IFNULL(?, description), lesson = IFNULL(?, lesson), authorId = IFNULL(?, authorId), category = IFNULL(?, category), relatedCourse = IFNULL(?, relatedCourse) WHERE id = ?', [name, description, lesson, authorId, category, relatedCourse, id]);
        const [result] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        sendSucces(res, 'Update course successfully', result[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const deleteCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        await pool.query('DELETE FROM course WHERE id = ?', [id]);
        sendSucces(res, 'Delete course successfully', course[0]);
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}