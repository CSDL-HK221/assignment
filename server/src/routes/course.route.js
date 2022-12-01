import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireAuthorComment, requireAuthorCourse, requireAuthorLesson, requireAuthorPost, requireAuthorQuiz } from "../middleware/requireAuthor.js";
import { requireInstructor } from "../middleware/requireInstructor.js";
import { getAllCourses, getCourseById, createCourse, updateCourseById, deleteCourseById } from "../controllers/course.controller.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/",requireInstructor(), createCourse);
router.put("/:id",requireAuthorCourse(), updateCourseById);
router.delete("/:id",requireAuthorCourse(), deleteCourseById);

export default router;