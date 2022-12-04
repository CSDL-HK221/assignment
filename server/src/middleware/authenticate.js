import jwt from "jsonwebtoken";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";
import { pool } from "../helper/db.js";

export const deserializeUser = async (req, res, next) => {
    const data = req.headers['authorization'];
    const accessToken = data?.split(" ")[1];
    
    try {
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, { complete: true });

        const user = await pool.query("SELECT * FROM user WHERE id = ?", [payload.id]);

        res.locals.user = user[0];
        next();
    } catch (error) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Unauthorized");
    }
}

export const requireUser = (req, res, next) => {
    const { user } = res.locals;

    if (!user) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Unauthorized.");
    }
    next();
}

export const authenticate = (req, res, next) => {
    return [
        deserializeUser,
        requireUser
    ]
}