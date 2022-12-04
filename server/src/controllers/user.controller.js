import { pool } from "../helper/db.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";
import omit from "lodash.omit";

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM user");
        console.log(rows);
        sendSucces(res, HttpStatusCode.OK, rows);    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        sendSucces(res, HttpStatusCode.OK, omit(user[0], "password"));
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const updateUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, role, age, email, phone, username } = req.body;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        
        await pool.query("UPDATE user SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), role = IFNULL(?, role), age = IFNULL(?, age), email = IFNULL(?, email), phone = IFNULL(?, phone), username = IFNULL(?, username) WHERE id = ?", [firstName, lastName, role, age, email, phone, username, id]);
        const [result] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        sendSucces(res, "Update successfully", omit(result[0], "password"));
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const changePassword = async (req, res) => {
    const id = parseInt(req.params.id);
    const { password, newPassword, confirmPassword } = req.body;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        if (password !== user[0].password) {
            sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid Password");
        }
        if (newPassword !== confirmPassword) {
            sendError(res, HttpStatusCode.BAD_REQUEST, "New Password and Confirm Password do not match");
        }
        await pool.query("UPDATE user SET password = ? WHERE id = ?", [newPassword, id]);
        sendSucces(res, "Change password successfully", omit(user[0], "password"));
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const deleteUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        await pool.query("DELETE FROM user WHERE id = ?", [id]);
        sendSucces(res, "Delete successfully", omit(user[0], "password"));
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const courseRegister = async (req, res) => {
    const user = res.locals.user;
    const { courseId } = req.body;
    try {
        const [course] = await pool.query("SELECT * FROM course WHERE id = ?", [courseId]);
        if (course.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "Course not found");
        }
        const [relatedCourse] = await pool.query("SELECT * FROM relatedCourse WHERE courseId= ? ", [courseId]);
        if (relatedCourse.length !== 0) {
            const [checkPreCourse] = await pool.query("SELECT * FROM enroll WHERE userId = ? AND courseId = ? AND completed = 1", [user.id, relatedCourse[0].relatedCourseId]);
            if (checkPreCourse.length === 0) {
                sendError(res, HttpStatusCode.BAD_REQUEST, "You have not completed the prerequisite course");
            }
        } 

        await pool.query("INSERT INTO enroll (userId, courseId) VALUES (?, ?)", [user.id, courseId]);
        await pool.query("UPDATE course SET courseMember = courseMember + 1 WHERE id = ?", [courseId]);
        sendSucces(res, "Course register successfully");

    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}