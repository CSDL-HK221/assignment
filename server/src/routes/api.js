import { Router } from "express";
import user from "./user.route.js";
import auth from "./auth.route.js";

const api = Router();

api.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

api.use("/user", user);
api.use("/auth", auth);

export default api;