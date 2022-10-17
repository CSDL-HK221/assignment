import jwt from "jsonwebtoken";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client";
import { pool } from "../helper/db";
import { compareSync } from "bcrypt";

export const deserializeUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, "qwe1234");
        req.user = decoded;
        next();
    } catch (ex) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Invalid token.");
    }
}

export const requireUser = (req, res, next) => {
    const { user } = req.locals;

    if (!req.user) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Access denied. No token provided.");
    }
    next();
}

export const authenticate = (req, res, next) => {
    return [
        deserializeUser,
        requireUser
    ]
}