import { authenticate } from "./authenticate.js";
import { sendError, sendErrorServerInterval } from "../helper/client.js";
import { pool } from "../helper/db.js";

export const requireAdminMiddleware = async (req, res, next) => {
    const { user } = res.locals;

    try {
        const [admin] = await pool.query("SELECT * FROM admin WHERE user_id = ?", [user.id]);

        if (!admin) {
            return sendError(res, HttpStatusCode.UNAUTHORIZED, "Unauthorized");
        }
        next();
    } catch (error) {
        return sendErrorServerInterval(res);
    }
}

export const requireAdmin = (req, res, next) => {
    return [
        authenticate,
        requireAdminMiddleware
    ]
}