import { Router } from "express";
import user from "./user.route.js";
import auth from "./auth.route.js";
import post from "./post.route.js";
import lesson from "./lesson.route.js";
import course from "./course.route.js";
import comment from "./comment.route.js";
import quiz from "./quiz.route.js";

const api = Router();

api.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

api.use("/user", user);
api.use("/auth", auth);
api.use("/post", post);
api.use("/lesson", lesson);
api.use("/course", course);
api.use("/comment", comment);
api.use("/quiz", quiz);

export default api;