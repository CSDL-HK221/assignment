import { pool } from '../helper/db.js';
import { sendSucces, sendError, sendErrorServerInterval, HttpStatusCode } from '../helper/client.js';

export const getAllCourses = async (req, res) => {
    try {
        const [course] = await pool.query('SELECT * FROM course');
        return sendSucces(res, 'Get all courses successfully', course);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        return sendSucces(res, HttpStatusCode.OK, course[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createCourse = async (req, res) => {
    const {user} = res.locals;
    req.body.author_id = user[0].id;
    const { name, description, author_id, category, duration, image } = req.body;
    try {
        const [course] = await pool.query('CALL INSERT_course(?,?,?,?,?,?)', [author_id, name, description, category, image, duration]);
        return sendSucces(res, 'Create course successfully', course[0]);
    } catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}

export const updateCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, author_id, category, courseMembers } = req.body;
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        await pool.query('UPDATE course SET name = IFNULL(?, name), description = IFNULL(?, description), author_id = IFNULL(?, author_id), category = IFNULL(?, category), courseMembers = IFNULL(?, courseMembers) WHERE id = ?', [name, description, author_id, category, courseMembers, id]);
        const [result] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        return sendSucces(res, 'Update course successfully', result[0]);
    } catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}

export const deleteCourseById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [course] = await pool.query('SELECT * FROM course WHERE id = ?', [id]);
        if (course.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, 'Course not found');
        }
        await pool.query('DELETE FROM course WHERE id = ?', [id]);
        return sendSucces(res, 'Delete course successfully', course[0]);
    } catch (error) {
        return sendErrorServerInterval(res, error);
    }
}
