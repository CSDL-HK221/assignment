import { authenticate } from "./authenticate.js";
import { sendError, sendErrorServerInterval, HttpStatusCode } from "../helper/client.js";
import { pool } from "../helper/db.js";

export const requireAdminMiddleware = async (req, res, next) => {
    const { user } = res.locals;

    try {
        const [admin] = await pool.query("SELECT * FROM admin WHERE user_id = ?", [user.id]);

        if(admin[0].role !== "admin") {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not admin");
        }

        next();
    } catch (error) {
        
    }
}

export const requireAdmin = (req, res, next) => {
    return [
        authenticate,
        requireAdminMiddleware
    ]
}