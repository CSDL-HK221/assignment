import { pool } from "../helper/db.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const getUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        sendSucces(res, users.rows);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (user.rows.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        sendSucces(res, user.rows[0]);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const updateUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, role, age, email, username } = req.body;
    try {
        const user = await pool.query(
            "UPDATE users SET firstName = $1, lastName = $2, role = $3, age = $4, email = $5, username = $6 WHERE id = $7 RETURNING *",
            [firstName, lastName, role, age, email, username, id]
        );
        if (user.rows.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        sendSucces(res, user.rows[0]);
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const deleteUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        if (user.rowCount === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        sendSucces(res, "User deleted successfully");
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}

