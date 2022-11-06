import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { getAllQuizByAnswerId, getQuizById, createQuiz, updateQuizById, deleteQuizById } from "../controllers/quiz.controller.js";

const router = Router();

router.use(authenticate());

router.get("/test", (req, res) => {
    res.send("this is quiz route");
});
router.get("/getAll/:id", getAllQuizByAnswerId);
router.get("/:id", getQuizById);
router.post("/",requireAdmin(), createQuiz);
router.put("/:id",requireAdmin(), updateQuizById);
router.delete("/:id", requireAdmin(), deleteQuizById);

export default router;