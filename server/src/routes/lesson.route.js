import { Router } from "express";
import { getAllLessonsFromCourse, getLessonById, createLesson, updateLessonById, deleteLessonById  } from "../controllers/lesson.controller.js";
import { authenticate } from '../middleware/authenticate.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { requireAuthorLesson } from "../middleware/requireAuthor.js";

const router = Router();

router.use(authenticate());

router.get("/", (req, res) => {
    res.send("this is lesson route");
});
router.get("/getAll/:id", getAllLessonsFromCourse);
router.get("/:id", getLessonById);
router.post("/", requireAuthorLesson(), createLesson);
router.put("/:id",requireAuthorLesson(), updateLessonById);
router.delete("/:id",requireAuthorLesson(), deleteLessonById);

export default router;