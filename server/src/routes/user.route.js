import { Router } from "express";
import { getUsers, getUserById, updateUserById, deleteUserById, changePassword } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.put("/change-password/:id", changePassword);

export default router;
