import { pool } from "../helper/db.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";
import omit from "lodash.omit";

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM user");
        console.log(rows);
        return sendSucces(res, HttpStatusCode.OK, rows);    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        return sendSucces(res, HttpStatusCode.OK, omit(user[0], "password"));
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const updateUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, role, age, email, phone, username } = req.body;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        
        await pool.query("UPDATE user SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), role = IFNULL(?, role), age = IFNULL(?, age), email = IFNULL(?, email), phone = IFNULL(?, phone), username = IFNULL(?, username) WHERE id = ?", [firstName, lastName, role, age, email, phone, username, id]);
        const [result] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        return sendSucces(res, "Update successfully", omit(result[0], "password"));
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const changePassword = async (req, res) => {
    const id = parseInt(req.params.id);
    const { password, newPassword, confirmPassword } = req.body;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        if (password !== user[0].password) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid Password");
        }
        if (newPassword !== confirmPassword) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "New Password and Confirm Password do not match");
        }
        await pool.query("UPDATE user SET password = ? WHERE id = ?", [newPassword, id]);
        return sendSucces(res, "Change password successfully", omit(user[0], "password"));
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const deleteUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        await pool.query("DELETE FROM user WHERE id = ?", [id]);
        return sendSucces(res, "Delete successfully", omit(user[0], "password"));
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const userEnrollCourse = async (req, res) => {
    const user = res.locals.user;
    const { id } = req.params;
    try {
        const [course] = await pool.query("CALL INSERT_enroll(?,?)", [user[0].id,id]);
        return sendSucces(res, "Course register successfully", course[0][0].messenge);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getEnrollByIdCourse = async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;
    try {
        const [course] = await pool.query("SELECT * FROM enroll WHERE user_id = ? AND course_id", [user[0].id,id]);
        if (course.length === 0) {
            return sendError(res, HttpStatusCode.OK, "Enroll now!");
        }
        return sendSucces(res, HttpStatusCode.OK, "Learn continue.");
    }
    catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}