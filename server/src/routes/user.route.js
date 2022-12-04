import { Router } from "express";
import { getUsers, getUserById, updateUserById, deleteUserById, changePassword, userEnrollCourse, getEnrollByIdCourse } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.put("/change-password/:id", changePassword);
router.post("/enroll/:id",authenticate(), userEnrollCourse);
router.get("/enroll/:id",authenticate(), getEnrollByIdCourse);

export default router;
