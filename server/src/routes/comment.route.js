import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("this is comment route");
});

export default router;