import { pool } from "../helper/db.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
// import { config } from "../../config/config.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const register = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    pool.query(
        "INSERT INTO users SET ?",
        body,
        (error, results, fields) => {
            if (error) {
                return sendErrorServerInterval(res);
            }
            return sendSucces(res, "User registered successfully", results);
        }
    );
}

export const login = (req, res) => {
    const body = req.body;

    pool.query(
        "SELECT * FROM users WHERE email = ?",
        body.email,
        (error, results, fields) => {
            if (error) {
                return sendErrorServerInterval(res);
            }
            if (!results || !compareSync(body.password, results[0].password)) {
                return sendError(res, HttpStatusCode.UNAUTHORIZED, "Invalid email or password");
            }
            results.password = undefined;
            const jsontoken = jwt.sign({ result: results }, "qwe1234", {
                expiresIn: "1h",
            });
            return res.json({ success: 1, message: "login successfully", token: jsontoken });
        }
    );
}