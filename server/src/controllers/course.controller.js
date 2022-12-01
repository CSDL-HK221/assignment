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
    const {user} = res.locals;
    req.body.authorId = user[0].id;
    const { name, description, authorId, category, numOfLessons, duration, images } = req.body;
    try {
        const [course] = await pool.query('INSERT INTO course (name, description, authorId, category, numOfLessons, duration, images) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, description, authorId, category, numOfLessons, duration, images]);
        sendSucces(res, 'Create course successfully', course[0]);
    } catch (error) {
        console.log(error);
        sendErrorServerInterval(res, error);
    }
}

export const updateCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, authorId, category, courseMembers } = req.body;
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        await pool.query('UPDATE course SET name = IFNULL(?, name), description = IFNULL(?, description), authorId = IFNULL(?, authorId), category = IFNULL(?, category), courseMembers = IFNULL(?, courseMembers) WHERE id = ?', [name, description, authorId, category, courseMembers, id]);
        const [result] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        sendSucces(res, 'Update course successfully', result[0]);
    } catch (error) {
        console.log(error);
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
