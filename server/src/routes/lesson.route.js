import { Router } from "express";
import { getAllLessonsFromCourse, getLessonById, createLesson, updateLessonById, deleteLessonById , memberLearnLesson, getCurrentLessonOfCourse } from "../controllers/lesson.controller.js";
import { authenticate } from '../middleware/authenticate.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { requireAuthorCourse } from "../middleware/requireAuthor.js";
const router = Router();

// router.use(authenticate());

router.get("/", (req, res) => {
    res.send("this is lesson route");
});
router.get("/getAll/:id", getAllLessonsFromCourse);
router.get("/:id", getLessonById);
router.post("/", requireAuthorCourse(), createLesson);
router.put("/:id",requireAuthorCourse(), updateLessonById);
router.delete("/:id",requireAuthorCourse(), deleteLessonById);
router.post("/learn/:id", authenticate(), memberLearnLesson);
router.get("/current/:id", authenticate(), getCurrentLessonOfCourse);

export default router;