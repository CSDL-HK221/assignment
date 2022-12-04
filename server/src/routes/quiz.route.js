import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireAuthorLesson } from "../middleware/requireAuthor.js";
import { getAllQuizByLessonId, getQuizById, createQuiz, updateQuizById, deleteQuizById, memberLearnQuiz } from "../controllers/quiz.controller.js";

const router = Router();

// router.use(authenticate());

router.get("/test", (req, res) => {
    res.send("this is quiz route");
});
router.get("/getAll/:id", getAllQuizByLessonId);
router.get("/:id", getQuizById);
router.post("/",requireAuthorLesson(), createQuiz);
router.put("/:id",requireAuthorLesson(), updateQuizById);
router.delete("/:id", requireAuthorLesson(), deleteQuizById);
router.post("/learn/:id", authenticate(), memberLearnQuiz);

export default router;