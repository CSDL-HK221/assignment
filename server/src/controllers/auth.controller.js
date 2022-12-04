import { pool } from "../helper/db.js";
import omit from "lodash.omit";
import jwt from "jsonwebtoken";
// import { config } from "../../config/config.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const register = async (req, res) => {
    const { role, email, username, password } = req.body;
    console.log(req.body);
    try {
        const user = await pool.query(
            "CALL INSERT_user(?, ?, ?, ?)",
            [username, password, email, role]
        )
        const accessToken = jwt.sign({ id: user.insertId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" }); 
        return sendSucces(res, "register successfully", { user: omit(user[0], "password"), accessToken });
    }
    catch (error) {
        console.log(error);
        sendErrorServerInterval(res, error);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {

        const [user] = await pool.query("SELECT * FROM user WHERE username = ?", [username]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        if (password !== user[0].password) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid Password");
        }
        const accessToken = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        return sendSucces(res, "login successfully", { user: omit(user[0], "password"), accessToken });
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const logout = async (req, res) => {
    try {
        return sendSucces(res, "logout successfully");
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}