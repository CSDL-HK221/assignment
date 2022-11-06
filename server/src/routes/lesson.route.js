import { Router } from "express";
import { getAllLessonsFromCourse, getLessonById, createLesson, updateLessonById, deleteLessonById  } from "../controllers/lesson.controller.js";
import { authenticate } from '../middleware/authenticate.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.use(authenticate());

router.get("/", (req, res) => {
    res.send("this is lesson route");
});
router.get("/getAll/:id", getAllLessonsFromCourse);
router.get("/:id", getLessonById);
router.post("/", requireAdmin(), createLesson);
router.put("/:id",requireAdmin(), updateLessonById);
router.delete("/:id",requireAdmin(), deleteLessonById);

export default router;