import { pool } from "../helper/db.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import omit from "lodash.omit";
import jwt from "jsonwebtoken";
// import { config } from "../../config/config.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const register = async (req, res) => {
    const { firstName, lastName, role, age, email, phone, username, password, confirmPassword } = req.body;
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    if (password !== confirmPassword) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Password and Confirm Password do not match");
    }
    try {
        const user = await pool.query(
            "INSERT INTO user (firstName, lastName, role, age, email, phone, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, role, age, email, phone, username, hashedPassword]
        )
        console.log(hashedPassword);
        const accessToken = jwt.sign({ id: user.insertId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }); 
        sendSucces(res, "register successfully", { accessToken });
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {

        const [user] = await pool.query("SELECT * FROM user WHERE username = ?", [username]);
        if (user.length === 0) {
            sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        const validPassword = compareSync(password, user[0].password);
        if (!validPassword) {
            sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid Password");
        }
        const accessToken = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        sendSucces(res, "login successfully", { user: omit(user[0], "password"), accessToken });
    }
    catch (error) {
        sendErrorServerInterval(res, error);
    }
}