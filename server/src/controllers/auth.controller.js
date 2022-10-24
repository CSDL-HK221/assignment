import { pool } from "../helper/db.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
// import { config } from "../../config/config.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const register = async (req, res) => {
    const { firstName, lastName, role, age, email, username, password, confirmPassword } = req.body;
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const hashedConfirmPassword = hashSync(confirmPassword, salt);
    if (password !== confirmPassword) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Password and Confirm Password do not match");
    }
    try {
        const user = await pool.query(
            "INSERT INTO users (firstName, lastName, role, age, email, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [firstName, lastName, role, age, email, username, hashedPassword]
        );
        const token = jwt.sign({ user: user.rows[0].id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        sendSucces(res, { token });
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (user.rows.length === 0) {
            sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid Credentials");
        }
        const validPassword = compareSync(password, user.rows[0].password);
        if (!validPassword) {
            sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid Credentials");
        }
        const token = jwt.sign({ user: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        sendSucces(res, { token });
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}