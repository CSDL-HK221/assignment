import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { getAllCourses, getCourseById, createCourse, updateCourseById, deleteCourseById } from "../controllers/course.controller.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/",requireAdmin(), createCourse);
router.put("/:id",requireAdmin(), updateCourseById);
router.delete("/:id",requireAdmin(), deleteCourseById);

export default router;